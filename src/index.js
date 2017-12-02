var config = require('./config')
var router = require('./router.js')

module.exports = (options) => {
  config.init(options)

  return router
}
