//This creates a router that the user can add routes to in order to create
//routes that require authentication

var express  = require('express')
var passport = require('passport')
var requireLoggedIn = require('./middleware/requireLoggedIn.js')

module.exports = () => {
  var router = express.Router()

  router.use(passport.initialize())
  router.use(passport.session())
  router.use(requireLoggedIn)

  return router
}
