"use strict"

////Serializer function used for BOTH
////serializeUser and deserializeUser
exports = module.exports = (serializers) => {

  return async (input, done) => {
    var output = {}

    try {
      for (var serializer of serializers)
        await serializer(input, output)
      done(null, output)
    }
    catch(err) {
      console.error(err)
    }
  }

}
