"use strict"

var config = require('./config')
var router = require('./router.js')
var configurePassport = require("./configurePassport")
var createAuthRouter = require('./createAuthRouter.js')
var use = require('./use')

module.exports = (options) => {
  config.init(options)
  configurePassport(options)

  return {
    config,
    router,

    //functions
    createAuthRouter,
    use
  }
}
