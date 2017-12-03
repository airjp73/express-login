var config = require('./config')
var router = require('./controllers/router.js')

module.exports = (options) => {
  config.init(options)

  return router
}
