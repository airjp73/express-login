var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var should = chai.should()
var expect = chai.expect
var sinon = require('sinon')

var mailer = require('./mailer')

describe('sendEmail', () => {
  var realmailerEmail = {}

  before(() => {
    realmailerEmail = mailer.email
  })
  after(() => {
    mailer.email = realmailerEmail
  })

  it('should call mailer.email.send with provided arguments and return info', async () => {
    mailer.email = {send: sinon.stub()}
    mailer.email.send.returns({messageId: "test"})
    var template = "test"
    var target = "test"
    var vars = {hello: "test"}

    var info = await mailer.sendEmail(template, target, vars)
    sinon.assert.calledOnce(mailer.email.send)
    var args = mailer.email.send.args[0][0]
    expect(args.template)   .to.equal(template)
    expect(args.message.to) .to.equal(target)
    expect(args.locals)     .to.equal(vars)
    expect(info).to.not.be.undefined
  })

  it('should exit with no error and return no info if mailer.email.send is undefined or empty', async () => {
    mailer.email = {}
    var template = "test"
    var target = "test"
    var vars = {hello: "test"}

    var info = await mailer.sendEmail()
    expect(info).to.be.undefined
  })
})
