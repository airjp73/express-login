"use strict"

var config = require('../config')
var verifyModule = require('./verifyModule')
var useModule = require('./useModule')

////Module Replacers
//These replacers check that the module is compatible with 'official' strategies
//The same effect can be achieved with useModule but without checking
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
  customModule: useModule,
  strategy:   require('./useStrategy')
}
