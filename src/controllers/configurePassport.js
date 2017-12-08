"use strict"

var LocalStrategy = require("passport-local").Strategy
var passport = require("passport")

var config = require('../config')
var encrypt = require("../helpers/encryption.js")
var con = require("../constants")

module.exports = function() {
  //Serialize and Deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      //var user = await config.database.getUser({_id: id}, ["email"])
      done(null, {_id: id})
    }
    catch(err) {
      done(err)
    }
  })

  //Local Signup
  passport.use(con.passport.LOCAL_SIGNUP,  new LocalStrategy({
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
        console.log(err)
        done(err)
      }
    }
  ))
}
