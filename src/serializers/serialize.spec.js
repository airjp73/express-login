var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')

var serialize = require('./serialize.js')

var customSerializer = (user, serial) => {
  serial.id = user.id
}
var serializers = [customSerializer]

describe("serialize", () => {
  it("should export a function", () => {
    expect(serialize).to.be.a('function')
  })

  it("should serialize user with id", async () => {
    var user = {id: "hello", name: "bob"}
    var done = sinon.spy()
    var result = {id:"hello"}

    await serialize(serializers)(user, done)

    sinon.assert.calledWith(done, null, sinon.match(result))
  })
})
