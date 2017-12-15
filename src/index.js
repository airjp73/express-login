"use strict"

var config = require('./config')
var router = require('./controllers/router.js')
var configurePassport = require("./controllers/configurePassport")
var createAuthRouter = require('./controllers/createAuthRouter.js')

module.exports = (options) => {
  config.init(options)
  configurePassport(options)

  return {
    config,
    router,
    createAuthRouter
  }
}
