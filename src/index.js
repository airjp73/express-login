"use strict"

var config = require('./config')
var router = require('./controllers/router.js')
var createAuthRouter = require('./controllers/createAuthRouter.js')

module.exports = (options) => {
  config.init(options)

  return {
    config,
    router,
    createAuthRouter
  }
}
