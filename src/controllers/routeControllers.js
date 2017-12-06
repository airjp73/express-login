var config = require('../config')
var encrypt = require("../helpers/encryption.js")
var con = require('../constants')

module.exports = {
  ////login
  login(req, res) {
    res.sendStatus(200)
  },

  ////signup
  signup(req, res, next) {
    res.sendStatus(200)

    config.mailer.sendEmail(con.emails.EMAIL_CONFIRM, req.user.email, {
        link: "http://" + req.headers.host + "/" + con.routes.CONFIRM_EMAIL + "/" + req.user.confirmEmailToken,
      })
      .catch(next)
  },



  ////resendConfirmation
  async resendConfirmation(req, res, next) {
    var selection = {_id: req.user._id}
    var fields = [
      con.fields.EMAIL,
      con.fields.EMAIL_CONFIRMED,
      con.fields.CONFIRM_EMAIL_TOKEN
    ]

    try {
      var user = await config.database.getUser(selection, fields)
      if (user.emailConfirmed)
        return res.status(403).json({message:"Email already confirmed"})
      res.sendStatus(202)

      await config.mailer.sendEmail(con.emails.EMAIL_CONFIRM, user.email, {
          link: "http://" + req.headers.host + "/" + con.routes.CONFIRM_EMAIL + "/" + user.confirmEmailToken,
        })
    }
    catch (err) {
      console.log(err)
      next(err)
    }
  },



  ////confirmEmail
  async confirmEmail(req, res, next) {
    try {

      var selection = {
        confirmEmailToken: req.body.confirmEmailToken
      }
      var fields = [
        con.fields.EMAIL_CONFIRMED,
        con.fields.CONFIRM_EMAIL_TOKEN
      ]

      var user = await config.database.getUser(selection, fields)
      if (!user)
        return res.status(404).json({message:"No user found with that token"})

      user.emailConfirmed = true
      user.confirmEmailToken = undefined
      user = await config.database.updateUser(user)

      res.sendStatus(200)

      config.mailer.sendEmail(con.emails.EMAIL_CONFIRM_THANK_YOU, user.email, {})

    }
    catch(err) {
      console.log(err)
      next(err)
    }
  },



  ////logout
  logout(req, res) {
    req.logout()
    res.sendStatus(200)
  },



  ////changePassword
  async changePassword(req, res, next) {
    try {
      var password = req.body.password
      var newPassword = req.body.newPassword
      var user = await config.database.getUser({_id: req.user.id}, [con.fields.EMAIL, con.fields.PASSWORD])
      var hash = user.password

      if (!encrypt.matchPassword(password, hash))
        return res.sendStatus(401)
      user.password = encrypt.hashPassword(newPassword)
      await config.database.updateUser(user)

      res.sendStatus(200)
      config.mailer.sendEmail("passwordChanged", user.email, {})

    }
    catch(err) {
      console.log(err)
      next(err)
    }
  },



  ////forgotPassword
  async forgotPassword(req, res, next) {
    try {
      var user = await config.database.getUser({email: req.body.email}, [con.fields.EMAIL])
      if (!user)
        return res.status(404).json({message: "no user with that email"})
      user.resetPasswordToken = encrypt.genToken(con.encrypt.RESET_PASS_TOKEN_BITS)
      user.resetPasswordExpires = con.encrypt.RESET_PASS_TOKEN_DUR
      await config.database.updateUser(user)

      res.sendStatus(200)

      config.mailer.sendEmail("forgotPassword", user.email, {
          link: "http://" + req.headers.host + "/" + con.routes.RESET_PASSWORD + "/" + user.resetPasswordToken
        })

    }
    catch(err) {
      console.log(err)
      next(err)
    }
  },



  ////resetPassword
  async resetPassword(req, res, next) {
    try {
      var user = await config.database.getUser({resetPasswordToken: req.body.resetPasswordToken}, [con.fields.EMAIL, con.fields.RESET_PASSWORD_EXPIRES])

      if (!user)
        return res.status(404).json({message: "no user with that resetPasswordToken"})

      if (Date.now() > user.resetPasswordExpires) {
        res.status(403).json({message:"Reset password token expired"})
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await config.database.updateUser(user)
        return
      }

      user.password = encrypt.hashPassword(req.body.newPassword)
      user.resetPasswordToken = undefined
      user.resetPasswordExpires = undefined
      user = await config.database.updateUser(user)

      res.sendStatus(200)

      config.mailer.sendEmail("passwordChanged", user.email, {})
    }
    catch(err) {
      next(err)
    }
  }
}
