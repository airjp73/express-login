"use strict"

var config = require('./config')
var router = require('./router.js')
var use = require('./use')
var configPassport = require('./configPassport')

//need to configure serializeUser and deserializeUser
configPassport()

exports = module.exports = (options) => {
  config.init(options)

  //return a middleware function to allow
  //app.use( expressLogin(options) )
  return (req, res, next) => {
    router(req, res, next)
  }
}

//Exposed functions
exports.createAuthRouter = require('./createAuthRouter')
exports.useStrategy   = use.strategy
exports.useDatabase   = use.database
exports.useMailer     = use.mailer
exports.useEncryption = use.encryption
