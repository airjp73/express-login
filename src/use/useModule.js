"use strict"

////Adds a module to config object or replaces an existing one
//Replacing default modules can be done but should usually be done with
//the specific function made for those

var config = require('../config')

module.exports = (modules) => {
  Object.assign(config, modules)
}
