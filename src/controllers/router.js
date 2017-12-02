//3rd party
var express = require("express")
var passport = require("passport")

//middleware
var requireLoggedIn = require("./middleware/requireLoggedIn.js")
var requireFields = require("./middleware/requireFields.js")
var handleErrors = require("./middleware/handleErrors.js")

//modules
var controllers = require("./routeControllers.js")
var configurePassport = require("./configurePassport")
require("../constants.js")

//router setup
var auth = express.Router()
auth.use(passport.initialize())
auth.use(passport.session())
auth.use(handleErrors)
configurePassport()

//router routes
auth.route( SIGNUP_ROUTE ).post(
  requireFields([
    EMAIL_FIELD,
    PASSWORD_FIELD
  ]),
  passport.authenticate(PASSPORT_LOCAL_SIGNUP),
  controllers.signup
)

auth.route( LOGIN_ROUTE ).post(
  requireFields([
    EMAIL_FIELD,
    PASSWORD_FIELD
  ]),
  passport.authenticate(PASSPORT_LOCAL_LOGIN),
  controllers.login
)

auth.route( LOGOUT_ROUTE ).post(
  controllers.logout
)

auth.route( RESEND_CONFIRMATION_ROUTE ).post(
  requireLoggedIn,
  controllers.resendConfirmation
)

auth.route( CONFIRM_EMAIL_ROUTE ).post(
  requireFields([
    CONFIRM_EMAIL_TOKEN_FIELD
  ]),
  controllers.confirmEmail
)

auth.route( CHANGE_PASSWORD_ROUTE ).post(
  requireLoggedIn,
  requireFields([
    EMAIL_FIELD,
    PASSWORD_FIELD,
    NEW_PASSWORD_FIELD
  ]),
  passport.authenticate(PASSPORT_LOCAL_LOGIN),
  controllers.changePassword
)

auth.route( FORGOT_PASSWORD_ROUTE ).post(
  requireFields([
    EMAIL_FIELD
  ]),
  controllers.forgotPassword
)

auth.route( RESET_PASSWORD_ROUTE ).post(
  requireFields([
    RESET_PASSWORD_TOKEN_FIELD,
    NEW_PASSWORD_FIELD
  ]),
  controllers.resetPassword
)

module.exports = auth;
