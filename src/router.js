"use strict"

//Base router
//Strategy routers get .used by this router

var express = require("express")
var passport = require("passport")

var router = express.Router()
router.use(passport.initialize())
router.use(passport.session())

module.exports = router;
