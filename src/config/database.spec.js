"use strict"

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var expect = chai.expect
var sinon = require('sinon')

var database = require('./database')

describe('database module', () => {
  var realUserModel = {}
  before(() => {
    realUserModel = database.userModel
  })
  after(() => {
    database.userModel = realUserModel
  })

  describe('init', () => {
    it('should assign userModel to model provided in options', () => {
      var options = {
        userModel: {test: "test"}
      }
      database.init(options)

      expect(database.userModel).to.equal(options.userModel)
    })

    it('should throw error if no userModel provided', () => {
      var options = {}
      expect(database.init, options).to.throw
    })
  })

  describe('getUser', () => {
    it('getUser should call userModel.findOne return user', async () => {
      var returnUser = {hello: "hi"}
      database.userModel = { findOne: sinon.stub() }
      database.userModel.findOne.returns(returnUser)
      var selection = {email: "email"}
      var projection = ["email", "password"]
      var projectionString = "email password"

      var user = await database.getUser(selection, projection)
      sinon.assert.calledWithExactly(
        database.userModel.findOne,
        selection,
        sinon.match.typeOf("string")
      )
      expect(database.userModel.findOne.args[0][1]).to.equal(projectionString)
      expect(user).to.equal(returnUser)

    })

    it('should reject if userModel is empty', () => {
      database.userModel = undefined
      return expect(database.getUser("", "")).to.be.rejected
    })

    it('should reject if database error', () => {
      database.userModel = {findOne: sinon.stub()}
      database.userModel.findOne.throws()

      return expect(database.getUser("", "")).to.be.rejected
    })
  })

  describe('updateUser', () => {
    it('updateUser should call userModel.save(user) with provided user', async () => {
      var user = {save: sinon.spy()}

      await database.updateUser(user)
      sinon.assert.called(user.save)
    })

    it('should reject if userModel is empty', () => {
      database.userModel = undefined
      var user = {}
      return expect(database.updateUser(user)).to.be.rejected
    })

    it('should reject if database error', () => {
      var user = {save: sinon.stub()}
      user.save.throws()

      return expect(database.updateUser(user)).to.be.rejected
    })
  })

  describe('newUser', () => {
    it('should create new userModel and save with provided user data', async () => {
      var mockUserData = {
        email: "hello@bob.com",
        password: "1234",
        confirmEmailToken: "5678"
      }
      var mockUser = {
        save: sinon.stub()
      }
      mockUser.save.returns(mockUser)
      database.userModel = function() {
        return mockUser
      }

      var user = await database.newUser(mockUserData)
      sinon.assert.calledOnce(mockUser.save)
      expect(user.email)            .to.equal(mockUserData.email)
      expect(user.password)         .to.equal(mockUserData.password)
      expect(user.confirmEmailToken).to.equal(mockUserData.confirmEmailToken)
      expect(user.save).to.not.be.undefined
    })

    it('should reject if userModel is undefined', () => {
      database.userModel = undefined
      var user = {}
      return expect(database.newUser(user)).to.be.rejected
    })

    it('should reject if database error', () => {
      database.userModel = function() {
        var save = sinon.stub()
        save.throws()
        return {save}
      }
      var user = {}

      return expect(database.newUser(user)).to.be.rejected
    })
  })
})
