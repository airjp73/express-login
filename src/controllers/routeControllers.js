var config = require('./config.js')
var encrypt = require("../helpers/encryption.js")
require('../constants.js')

module.exports = {
  ////login
  login(req, res) {
    return res.sendStatus(200)
  },

  ////signup
  signup(req, res, next) {
    res.sendStatus(200)

    mailer.sendEmail(EMAIL_CONFIRM_EMAIL, req.user.email, {
        link: "http://" + req.headers.host + "/" + CONFIRM_EMAIL_ROUTE + "/" + req.user.confirmEmailToken,
      })
      .catch(next)
  },



  ////resendConfirmation
  resendConfirmation(req, res, next) {
    if (req.user.emailConfirmed)
      return res.status(403).json({message:"Email already confirmed"})

    mailer.sendEmail(EMAIL_CONFIRM_EMAIL, req.user.email, {
        link: "http://" + req.headers.host + "/" + CONFIRM_EMAIL_ROUTE + "/" + req.user.confirmEmailToken,
      })
      .catch(next)

    res.sendStatus(202)
  },



  ////confirmEmail
  async confirmEmail(req, res, next) {
    try {

      req.user.emailConfirmed = true
      req.user.confirmEmailToken = undefined
      req.user = await req.user.save()

      res.sendStatus(200)

      mailer.sendEmail(EMAIL_CONFIRM_THANK_YOU_EMAIL, req.user.email, {})

    }
    catch(err) {
      next(err)
    }
  },



  ////logout
  logout(req, res, next) {
    req.logout()
    return res.status(200)
  },



  ////changePassword
  async changePassword(req, res, next) {
    try {
      var newPassword = req.body[NEW_PASSWORD_FIELD]
      var user = await config.database.getUser({_id: req.user.id}, [PASSWORD_FIELD])
      if (!encrypt.matchPassword(user.password, newPassword))
        return res.sendStatus(401)

      user.password = encrypt.hashPassword(newPassword)
      await config.database.updateUser(user)

      res.sendStatus(200)
      mailer.sendEmail("passwordChanged", req.user.email, {})

    }
    catch(err) {
      next(err)
    }
  },



  ////forgotPassword
  async forgotPassword(req, res, next) {
    try {

      req.user.resetPasswordToken = encrypt.genToken(RESET_PASS_TOKEN_BITS)
      req.user.resetPasswordExpires = RESET_PASS_TOKEN_DUR
      await config.database.updateUser(req.user)

      res.sendStatus(200)

      mailer.sendEmail("forgotPassword", req.user.email, {
          link: "http://" + req.headers.host + "/" + RESET_PASSWORD_ROUTE + "/" + req.user.resetPasswordToken
        })

    }
    catch(err) {
      next(err)
    }
  },



  ////resetPassword
  async resetPassword(req, res, next) {
    try {

      if (Date.now() > req.user.resetPasswordExpires) {
        res.status(403).json({message:"Reset password token expired"})
        req.user.resetPasswordToken = undefined
        req.user.resetPasswordExpires = undefined
        await config.database.updateUser(req.user)
        return
      }


      req.user.password = encrypt.hashPassword(req.body.newPassword)
      req.user.resetPasswordToken = undefined
      req.user.resetPasswordExpires = undefined
      req.user = await config.database.updateUser(req.user)

      res.sendStatus(200)

      mailer.sendEmail("passwordChanged", req.user.email, {})

    }
    catch(err) {
      next(err)
    }
  }
}
