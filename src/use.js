"use strict"

//Allow user to expressLogin.use() for strategies

var config = require('./config')
var passport = require('passport')

module.exports = (strategy) => {
  strategy.init(config, passport)
}
