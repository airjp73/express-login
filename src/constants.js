
//Will be configurable

//Route Strings
export const LOGIN_ROUTE               = "/login",
export const LOGOUT_ROUTE              = "logout",
export const SIGNUP_ROUTE              = "/signup",
export const RESEND_CONFIRMATION_ROUTE = "/resendConfirmation",
export const CONFIRM_EMAIL_ROUTE       = "/confirmEmail",
export const CHANGE_PASSWORD_ROUTE     = "/changePassword",
export const FORGOT_PASSWORD_ROUTE     = "/forgotPassword",
export const RESET_PASSWORD_ROUTE      = "/resetPassword",

//Field Strings
export const EMAIL_FIELD                  = "email",
export const PASSWORD_FIELD               = "password",
export const NEW_PASSWORD_FIELD           = "newPassword"
export const CONFIRM_EMAIL_TOKEN_FIELD    = "confirmEmailToken",
export const RESET_PASSWORD_TOKEN_FIELD   = "resetPasswordToken",
export const RESET_PASSWORD_EXPIRES_FIELD = "resetPasswordExpires"

//Passport Strategies
export const PASSPORT_LOCAL_LOGIN  = "local-login"
export const PASSPORT_LOCAL_SIGNUP = "local-signup"

//Email Templates
export const EMAIL_CONFIRM_EMAIL = "emailConfirm"
export const EMAIL_CONFIRM_THANK_YOU_EMAIL = "emailConfirmThankYou"
export const FORGOT_PASSWORD_EMAIL = "forgotPassword"
export const PASSWORD_CHANGED_EMAIL = "passwordChanged"

//Encryption
export const CONFIRM_TOKEN_BITS = 16
export const RESET_PASS_TOKEN_BITS = 32
export const RESET_PASS_TOKEN_DUR = 360000
