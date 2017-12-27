var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')

var config = {
  init: sinon.spy()
}
proxyquire('./index.js', {
  './config': config
})
var index = require('./index.js')



describe("src", () => {
  it("should return a function", () => {
    expect(index).to.be.a('function')
  })

  it("function should call config.init and return a function", () => {
    var options = {}
    var obj = index(options)

    sinon.assert.calledWith(config.init, options)
    expect(obj).to.be.an('function')
  })
})
