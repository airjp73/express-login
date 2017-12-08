"use strict"

var crypto = require("crypto")
var bcrypt = require("bcrypt-nodejs")

module.exports = {
  genToken(bits) {
    return crypto.randomBytes(bits).toString('hex')
  },

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  },

  matchPassword(candidatePass, passwordHash) {
    return bcrypt.compareSync(candidatePass, passwordHash)
  }
}
