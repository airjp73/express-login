"use strict"

var LocalStrategy = require("passport-local").Strategy
var OAuth2Strategy = require("passsport-google-oauth").OAuth2Strategy
var passport = require("passport")

var config = require('../config')
var encrypt = require("../helpers/encryption.js")
var con = require("../constants")

module.exports = function(options) {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    //each route selects the specific fields that it needs
    //so there's no need to query the database here
    done(null, {_id: id})
  })

  //Local Signup
  /*passport.use(con.passport.LOCAL_SIGNUP,  new LocalStrategy({
      usernameField : con.fields.EMAIL,
      passwordField : con.fields.PASSWORD,
      passReqToCallback : true
    },
    async (req, email, password, done) => {
      try {

        //check for existing user
        var user = await config.database.getUser({email: email})
        if (user)
          return done(null, false, {message: con.fields.EMAIL + " in use"})

        //populate user data and save
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
  passport.use(con.passport.LOCAL_LOGIN, new LocalStrategy ({
      usernameField : con.fields.EMAIL,
      passwordField : con.fields.PASSWORD,
      passReqToCallback : true
    },
    async (req, email, password, done) => {
      try {

        var user = await config.database.getUser({[con.fields.EMAIL]: email}, [con.fields.PASSWORD])

        if (!user)
          return done(null, false, {message : "no user found"})
        if (!encrypt.matchPassword(password, user[con.fields.PASSWORD]))
          return done(null, false, {message : "invalid password"})

        //make password undefined just to be safe
        user[con.fields.PASSWORD] = undefined
        return done(null, user)

      }
      catch(err) {
        done(err)
      }
    }
  ))*/

  //Oauth2
  passport.use("oauth2", new OAuth2Strategy({
    clientID    : options.oauth2.clientID,
    clientSecret: options.oauth2.clientSecret,
    callbackURL : options.oauth2.callbackURL
  },
  async (token, refreshToken, profile, done) => {
    try {
      var user = await config.database.getUser({[con.fields.OAUTH2_TOKEN]})
      if (user)
        return done(null, user)
      return await config.database.newUser( {oauth2Token : token} )
    }
    catch(err) {
      return done(err)
    }
  }))
}
