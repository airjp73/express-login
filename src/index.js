"use strict"

var config = require('./config')
var router = require('./router.js')
var configPassport = require('./configPassport')

configPassport()

exports = module.exports = (options) => {
  config.init(options)

  //return a middleware function to allow
  //app.use( expressLogin(options) )
  return (req, res, next) => {
    router(req, res, next)
  }
}

exports.createAuthRouter = require('./createAuthRouter')
exports.useStrategy   = require('./useStrategy')
exports.useDatabase   = require('./useDatabase')
exports.useMailer     = require('./useMailer')
exports.useEncryption = require('./useEncryption')
