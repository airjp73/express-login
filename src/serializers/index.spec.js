var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var proxyquire = require('proxyquire').noPreserveCache()

var mockPassport = {
  serializeUser: sinon.spy(),
  deserializeUser: sinon.spy()
}
var serializer = proxyquire('./index.js', {
  'passport': mockPassport
})

describe("serializer", () => {
  it("should export and object", () => {
    expect(serializer).to.be.an('object')
  })

  describe("init", () => {
    before(() => {
      serializer.init({flubajub:"hi"})
    })

    it("should set call serializerUser and deserializeUser", () => {
      sinon.assert.called(mockPassport.serializeUser)
      sinon.assert.called(mockPassport.deserializeUser)
    })

    it("should serialize user with id", async () => {
      var user = {id: "hello", name: "bob"}
      var done = sinon.spy()
      var result = {id:"hello"}

      var func = mockPassport.serializeUser.getCall(0).args[0]
      await func(user, done)

      sinon.assert.calledWith(done, null, sinon.match(result))
    })
  })
})
