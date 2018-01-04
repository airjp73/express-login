"use strict"

var config = require('./config')
var router = require('./router.js')
var use = require('./use')
var serializers = require('./serializers')


exports = module.exports = (options) => {
  if (!options)
    options = {}
    
  //config object
  config.init(options)

  //serializeUser and deserializeUser
  serializers.init(config, options)

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
exports.useModule     = use.customModule
