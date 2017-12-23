"use strict"

var config = require('./config')
var router = require('./router.js')
var createAuthRouter = require('./createAuthRouter.js')
var use = require('./use')
var configPassport = require('./configPassport')

module.exports = (options) => {
  config.init(options)
  configPassport()

  return {
    config,
    router,

    //functions
    createAuthRouter,
    use
  }
}
