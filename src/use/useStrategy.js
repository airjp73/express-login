"use strict"

//Allow user to expressLogin.use() for strategies

var passport = require('passport')
var config = require('../config')
var router = require('../router')

module.exports = (strategy) => {
  var routes = strategy.init(config, passport)
  router.use(routes)
}
