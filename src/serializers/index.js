
var passport = require('passport')
var serialize = require('./serialize')

var serializers = [defaultSerializer]
var deserializers = [defaultDeserializer]

module.exports = {
  init,
  useSerializer,
  useDeserializer
}

//init
function init(options) {
  passport.serializeUser  (   serialize(serializers)     )
  passport.deserializeUser(   serialize(deserializers)   )
}

////allow adding more serailizers
function useSerializer(serializer) {
  if (typeof serializer != 'function' || serializer.length != 2)
    throw new Error("Serializer must be a function that takes two arguments")

  serializers.push(serializer)
}

function useDeserializer(deserializer) {
  if (typeof deserializer != 'function' || deserializer.length != 2)
    throw new Error("Deserializer must be a function that takes two arguments")

  deserializers.push(deserializer)
}

//defaults
function defaultSerializer(user, serial) {
  serial.id = user.id
}

function defaultDeserializer(serial, user) {
  user.id = serial.id
}
