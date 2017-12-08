"use strict"

//Config object that contains the database and mailer modules
//This is mutable by providing an options object

module.exports = {
  init(options) {
    this.database = options.database  || require('./database.js')
    if (!options.database)
      this.database.init(options)

    this.mailer   = options.mailer    || require('./mailer.js')
    if (!options.mailer)
      this.mailer.init(options)
  }
}
