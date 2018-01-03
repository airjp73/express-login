var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')

var index = require('./index.js')



describe("config", () => {
  it("should return an object", () => {
    expect(index).to.be.an('object')
  })

  it("init should call init on sub-modules", () => {
    var dbinit = sinon.stub(index.database, "init")
    var mailinit = sinon.stub(index.mailer, "init")

    index.init({})
    sinon.assert.called(dbinit)
    sinon.assert.called(mailinit)

    dbinit.restore()
    mailinit.restore()
  })
})
