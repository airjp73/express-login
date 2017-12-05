var crypto = require("crypto")
var bcrypt = require("bcrypt-nodejs")

module.exports = {
  genToken(bits) {
    return crypto.randomBytes(16).toString('hex')
  },

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  },

  matchPassword(candidatePass, passwordHash) {
    return bcrypt.compareSync(candidatePass, passwordHash)
  }
}
