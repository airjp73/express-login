"use strict"

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')

var use = require('./use')

describe("use", () => {
  it("should export a function", () => {
    expect(use).to.be.a('function')
  })

  it("should accept a strategy as argument and call its init function", () => {
    var strategy = {
      init: sinon.spy()
    }
    use(strategy)
    sinon.assert.calledOnce(strategy.init)
  })
})
