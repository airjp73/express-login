"use strict"

//Config object that contains the modules that get used by strategies
//These are all replacable with custom modules

module.exports = {
  init(options) {
    this.database.init(options)
    this.mailer.init(options)
  },

  database: require('./database'),
  mailer:   require('./mailer'),
  encrypt:  require('./encryption')
}
