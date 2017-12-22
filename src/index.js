"use strict"

var config = require('./config')
var router = require('./router.js')
var createAuthRouter = require('./createAuthRouter.js')
var use = require('./use')

module.exports = (options) => {
  config.init(options)

  return {
    config,
    router,

    //functions
    createAuthRouter,
    use
  }
}
