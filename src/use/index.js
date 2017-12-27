"use strict"

var config = require('../config')
var verifyModule = require('./verifyModule')

////Module Replacers
var useDatabase = (database) => {
  verifyModule(database, [
    'getUser',
    'updateUser',
    'newUser',
    'init'
  ])
  config.database = database
}

var useEncryption = (encrypt) => {
  verifyModule(encrypt, [
    'genToken',
    'hashPassword',
    'matchPassword'
  ])
  config.encrypt = encrypt
}

var useMailer = (mailer) => {
  verifyModule(mailer, [
    'sendEmail',
    'init'
  ])
  config.mailer = mailer
}

module.exports = {
  database:   useDatabase,
  encryption: useEncryption,
  mailer:     useMailer,
  strategy:   require('./useStrategy')
}
