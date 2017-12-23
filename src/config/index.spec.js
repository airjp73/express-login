var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')

var index = require('./index.js')



describe("config", () => {
  it("should return an object", () => {
    expect(index).to.be.an('object')
  })
})
