"use strict"

//3rd party
var express = require("express")
var passport = require("passport")

//modules
var con = require("../constants")

//router setup
var auth = express.Router()
auth.use(passport.initialize())
auth.use(passport.session())

module.exports = auth;
