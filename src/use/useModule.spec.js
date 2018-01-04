"use strict"

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')

var useModule = require('./useModule.js')
var config = require('../config')

describe("useModule", () => {
  var oldDB = config.database
  var args = {
    testModule: {
      test: "test"
    },
    database: {
      dbTest: "test"
    }
  }

  before(() => {
    useModule(args)
  })

  it("should add testModule to config object", () => {
    expect(config.testModule).to.equal(args.testModule)
  })

  it("should overwrite existing module", () => {
    expect(config.database).to.equal(args.database)
  })

  after(() => {
    config.database = oldDB
  })
})
