var chai = require('chai')
var expect = chai.expect
var encrypt = require('./encryption.js')

var password = "mypassword"
var hash = "$2a$08$Yrq6jr.4Z1b8lOFBuMQdReVRoZ1jw3ZGa.LoBq55H1.DtirPUJwoC"

describe('encryption', () => {

  it("matchPassword should be true if given correct password", () => {
    expect(encrypt.matchPassword(password, hash)).to.be.true
  })

  it("matchPassword should be false if given wrong password", () => {
    expect(encrypt.matchPassword("wrongPass", hash)).to.be.false
  })
})
