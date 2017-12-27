"use strict"

var chai = require('chai')
var expect = chai.expect

var express = require('express')
var createAuthRouter = require('./createAuthRouter.js')

describe("createAuthRouter", () => {
  it("should export a function", () => {
    expect(createAuthRouter).to.be.a('function')
  })

  it("should return an express router", () => {
    var router = createAuthRouter()
    expect(Object.getPrototypeOf(router)).to.equal(express.Router)
  })
})
