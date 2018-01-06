"use strict"

//Config object that contains the modules that get used by strategies
//These are all replacable with custom modules

var serializers = require('../serializers')

module.exports = {
  init(options) {
    this.options = options

    //init is not mandatory for custom modules
    if (this.database.init)
      this.database.init(options)
    if (this.mailer.init)
      this.mailer.init(options)
  },

  database: require('./database'),
  mailer:   require('./mailer'),
  encrypt:  require('./encryption'),

  //expose serializer to strategies
  useSerializer: serializers.useSerializer,
  useDeserializer: serializers.useDeserializer
}
