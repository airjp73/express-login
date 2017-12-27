"use strict"

//3rd party
var express = require("express")
var passport = require("passport")

//router setup
var router = express.Router()
router.use(passport.initialize())
router.use(passport.session())

module.exports = router;
