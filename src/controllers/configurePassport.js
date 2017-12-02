var LocalStrategy = require("passport-local").Strategy
var passport = require("passport")

var config = require('../config.js')
var encrypt = require("../helpers/encryption.js")
require("../constants.js")

module.exports = function() {
  //Serialize and Deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      var user = await config.database.getUser({_id: id})
      done(null, user)
    }
    catch(err) {
      done(err)
    }
  })

  //Local Signup
  passport.use(PASSPORT_LOCAL_SIGNUP,  new LocalStrategy({
      usernameField : EMAIL_FIELD,
      passwordField : PASSWORD_FIELD,
      passReqToCallback : true
    },
    async (req, email, password, done) => {
      try {

        //check for existing user
        var user = await config.database.getUser({email: email})
        if (user)
          return done(null, false, {message: EMAIL_FIELD + " in use"})

        //
        var token = encrypt.genToken(16)
        var hash  = encrypt.hashPassword(password)
        var userData = {}
        userData.email = email
        userData.password = hash
        userData.confirmEmailToken = token
        user = await config.database.newUser(userData)

        //make password undefined just to be safe
        //make sure confirmEmailToken is present in case it has select: false
        user.password = undefined
        user.confirmEmailToken = token

        return done(null, user)

      }
      catch(err) {
        done(err)
      }
    }
  ))

  //Local Login
  passport.use(PASSPORT_LOCAL_LOGIN, new LocalStrategy ({
      usernameField : EMAIL_FIELD,
      passwordField : PASSWORD_FIELD,
      passReqToCallback : true
    },
    async (req, email, password, done) => {
      try {

        var user = await config.database.getUser({EMAIL_FIELD: email}, [PASSWORD_FIELD])
        if (!user)
          return done(null, false, {message : "no user found"})
        if (!encrypt.matchPassword(password, user[PASSWORD_FIELD]))
          return done(null, false, {message : "invalid password"})

        //make password undefined just to be safe
        user[PASSWORD_FIELD] = undefined
        return done(null, user)

      }
      catch(err) {
        done(err)
      }
    }
  ))
}
