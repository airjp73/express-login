"use strict"

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')

var express = require('express')
var use = require('./index.js')
var config = require('../config')

describe("use", () => {
  it("should export an object", () => {
    expect(use).to.be.an('object')
  })

  ///////////////////////////////useDatabase
  describe("useDatabase", () => {
    var oldDB = config.database
    var mockDB = {
      init: sinon.spy(),
      getUser: sinon.spy(),
      newUser: sinon.spy(),
      updateUser: sinon.spy()
    }
    it("should replace config.database", () => {
      use.database(mockDB)
      expect(config.database).to.equal(mockDB)
    })

    it("should work with with default db", () => {
      expect( () => {use.database(config.database)} ).to.not.throw()
    })

    it("should throw if missing a function", () => {
      mockDB.getUser = undefined
      expect( () => {use.database(mockDB)} ).to.throw()
    })

    after(() => {
      config.database = oldDB
    })
  })

  ///////////////////////////////useEncryption
  describe("useEncryption", () => {
    var oldEncryption = config.encrypt
    var mockEncryption = {
      genToken: sinon.spy(),
      hashPassword: sinon.spy(),
      matchPassword: sinon.spy()
    }

    it("should replace config.encrypt", () => {
      use.encryption(mockEncryption)
      expect(config.encrypt).to.equal(mockEncryption)
    })

    it("should work with default", () => {
      expect( () => {use.encryption(config.encrypt)} ).to.not.throw()
    })

    it("should throw if missing a function", () => {
      mockEncryption.hashPassword = undefined
      expect( () => {use.encryption(mockEncryption)} ).to.throw()
    })

    after(() => {
      config.encrypt = oldEncryption
    })
  })

  ///////////////////////////////useMailer
  describe("useMailer", () => {
    var mockMailer = {
      init: sinon.spy(),
      sendEmail: sinon.spy()
    }
    var oldMailer = config.mailer

    it("should replace config.mailer", () => {
      use.mailer(mockMailer)
      expect(config.mailer).to.equal(mockMailer)
    })

    it("should work with default", () => {
      expect( () => {use.mailer(config.mailer)} ).to.not.throw()
    })

    it("should throw if missing a function", () => {
      mockMailer.sendEmail = undefined
      expect( () => {use.mailer(mockMailer)} ).to.throw()
    })
  })

})
