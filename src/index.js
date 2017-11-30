var passport = require('passport')

var config = require('./config.js')
var router = require('./router.js')
var configurePassport = require('./configurePassport')

module.exports = (options) => {
  Object.assign(config, options)
  configurePassport(passport)

  router.use(passport.initialize())
  router.use(passort.session())
  return router
}
