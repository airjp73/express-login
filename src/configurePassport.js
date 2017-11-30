var LocalStrategy = require("passport-local").Strategy
var crypto = require("crypto")

var config = require('./config.js')

module.exports = function(passport) {
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
  passport.use("local-signup",  new LocalStrategy({
      usernameField : "email",
      passwordField : "password",
      passReqToCallback : true
    },
    async (req, email, password, done) => {
      try {

        //check for existing user
        var user = await config.database.getUser({email: email})
        if (user)
          return done(null, false, {message: "email in use"})

        var token = crypto.randomBytes(16).toString('hex')
        var hash  = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
        userData = {}
        userData.email = email
        userData.password = hash
        userData.confirmEmailToken = token
        var user = await config.database.newUser(userData)

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
  passport.use("local-login", new LocalStrategy ({
      usernameField : "email",
      passwordField : "password",
      passReqToCallback : true
    },
    async (req, email, password, done) => {
      try {

        var user = await config.database.getUser({email: email}, "+password")
        if (!user)
          return done(null, false, {message : "no user found"})
        if (!bcrypt.compareSync(password, user.password))
          return done(null, false, {message : "invalid password"})

        //make password undefined just to be safe
        user.password = undefined
        return done(null, user)

      }
      catch(err) {
        done(err)
      }
    }
  ))
}
