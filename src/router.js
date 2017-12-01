//3rd party
var express = require("express")
var passport = require("passport")

//middleware
var requireLoggedIn = require("./middleware/requireLoggedIn.js")
var requireFields = require("./middleware/requireFields.js")
var handleErrors = require("./middleware/handleErrors.js")

//modules
var controllers = require("./controllers.js")
require("./constants.js")

//router
var api = express.Router()
api.use(handleErrors)

api.route( LOGIN_ROUTE ).post(
  requireFields([
    EMAIL_FIELD,
    PASSWORD_FIELD
  ]),
  passport.authenticate(PASSPORT_LOCAL_LOGIN),
  controllers.login
)

api.route( LOGOUT_ROUTE ).post(
  controllers.logout
)

api.route( SIGNUP_ROUTE ).post(
  requireFields([
    EMAIL_FIELD,
    PASSWORD_FIELD
  ]),
  passport.authenticate(PASSPORT_LOCAL_SIGNUP),
  controllers.signup
)

api.route( RESEND_CONFIRMATION_ROUTE ).post(
  requireLoggedIn,
  controllers.resendConfirmation
)

api.route( CONFIRM_EMAIL_ROUTE ).post(
  requireFields([
    CONFIRM_EMAIL_TOKEN_FIELD
  ]),
  controllers.confirmEmail
)

api.route( CHANGE_PASSWORD_ROUTE ).post(
  requireLoggedIn,
  requireFields([
    EMAIL_FIELD,
    PASSWORD_FIELD,
    NEW_PASSWORD_FIELD
  ]),
  passport.authenticate('local-login'),
  controllers.changePassword
)

api.route( FORGOT_PASSWORD_ROUTE ).post(
  requireFields([
    EMAIL_FIELD
  ]),
  controllers.forgotPassword
)

api.route( RESET_PASSWORD_ROUTE ).post(
  requireFields([
    RESET_PASSWORD_TOKEN_FIELD,
    NEW_PASSWORD_FIELD
  ]),
  controllers.resetPassword
)

module.exports = api;
