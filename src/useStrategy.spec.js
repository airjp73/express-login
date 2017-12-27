"use strict"

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')

var use = require('./use')
var router = require('./router')
sinon.stub(router, "use")


describe("useStrategy", () => {
  it("should export a function", () => {
    expect(use).to.be.a('function')
  })

  describe("function behavior", () => {
    var routes = {}
    var strategy = {
      init: sinon.stub().returns(routes)
    }
    before(() => {
      use(strategy)
    })

    it("should call strategy.init", () => {
      sinon.assert.calledOnce(strategy.init)
    })

    it("should call router.use on returned routes", () => {
      sinon.assert.calledWith(router.use, routes)
      router.use.reset()
    })
  })

})
