
var passport = require('passport')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    done(null, {_id: id})
  })
}
