"use strict"

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')

var serializeUser = sinon.spy()
var deserializeUser = sinon.spy()
proxyquire('./configPassport', {
  'passport': {
    serializeUser,
    deserializeUser
  }
})

var configPassport = require('./configPassport')

describe("configPassport", () => {
  it("should export a function", () => {
    expect(configPassport).to.be.a('function')
  })

  it("should call serializeUser and deserializeUser", () => {
    configPassport()

    sinon.assert.called(serializeUser)
    sinon.assert.called(deserializeUser)
  })
})
