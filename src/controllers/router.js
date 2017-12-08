"use strict"

//3rd party
var express = require("express")
var passport = require("passport")

//middleware
var requireLoggedIn = require("./middleware/requireLoggedIn.js")
var requireFields = require("require-fields")

//modules
var controllers = require("./routeControllers.js")
var configurePassport = require("./configurePassport")
var con = require("../constants")

//router setup
var auth = express.Router()
auth.use(passport.initialize())
auth.use(passport.session())
configurePassport()

//router routes
auth.route( con.routes.SIGNUP ).post(
  requireFields([
    con.fields.EMAIL,
    con.fields.PASSWORD
  ]),
  passport.authenticate(con.passport.LOCAL_SIGNUP),
  controllers.signup
)

auth.route( con.routes.LOGIN ).post(
  requireFields([
    con.fields.EMAIL,
    con.fields.PASSWORD
  ]),
  passport.authenticate(con.passport.LOCAL_LOGIN),
  controllers.login
)

auth.route( con.routes.LOGOUT ).post(
  requireLoggedIn,
  controllers.logout
)

auth.route( con.routes.RESEND_CONFIRMATION ).post(
  requireLoggedIn,
  controllers.resendConfirmation
)

auth.route( con.routes.CONFIRM_EMAIL ).post(
  requireFields([
    con.fields.CONFIRM_EMAIL_TOKEN
  ]),
  controllers.confirmEmail
)

auth.route( con.routes.CHANGE_PASSWORD ).post(
  requireFields([
    con.fields.EMAIL,
    con.fields.PASSWORD,
    con.fields.NEW_PASSWORD
  ]),
  passport.authenticate(con.passport.LOCAL_LOGIN),
  controllers.changePassword
)

auth.route( con.routes.FORGOT_PASSWORD ).post(
  requireFields([
    con.fields.EMAIL
  ]),
  controllers.forgotPassword
)

auth.route( con.routes.RESET_PASSWORD ).post(
  requireFields([
    con.fields.RESET_PASSWORD_TOKEN,
    con.fields.NEW_PASSWORD
  ]),
  controllers.resetPassword
)

module.exports = auth;
