"use strict"

//Give a strategy to expressLogin
//Called just like app.use or router.use
//example: expressLogin.useStrategy('/local', localStrategy)

var passport = require('passport')
var config = require('../config')
var router = require('../router')

module.exports = (routeStr, strategy) => {
  //Check if only one argument
  //by rights, the optional argument should be second but this function mimics app.use
  if (!strategy) {
    strategy = routeStr
    routeStr = undefined
  }

  var strategyRouter = strategy.init(config, passport)

  if (routeStr)
    router.use(routeStr, strategyRouter)
  else
    router.use(strategyRouter)
}
