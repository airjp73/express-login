"use strict"

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')

var useStrategy = require('./useStrategy')
var router = require('../router')
sinon.stub(router, "use")


describe("useStrategy", () => {
  it("should export a function", () => {
    expect(useStrategy).to.be.a('function')
  })

  describe("function behavior 2 args", () => {
    var routes = {}
    var routeStr = "/test"
    var strategy = sinon.stub().returns(routes)
    before(() => {
      useStrategy(routeStr, strategy)
    })

    it("should call strategy.init", () => {
      sinon.assert.calledOnce(strategy)
    })

    it("should call router.use with routeStr and routes", () => {
      sinon.assert.calledWith(router.use, routeStr, routes)
      router.use.reset()
    })
  })

  describe("function behavior 1 arg", () => {
    var routes = {}
    var strategy = sinon.stub().returns(routes)
    before(() => {
      useStrategy(strategy)
    })

    it("should call strategy.init", () => {
      sinon.assert.calledOnce(strategy)
    })

    it("should call router.use on returned routes", () => {
      sinon.assert.calledWith(router.use, routes)
      router.use.reset()
    })
  })

})
