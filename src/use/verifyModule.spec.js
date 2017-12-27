"use strict"

var chai = require('chai')
var expect = chai.expect
var verifyModule = require('./verifyModule')

var mockModule = {
  test1: function(){},
  test2: function(){},
  test3: function(){},
  test4: function(){}
}
var mockFields = ["test1", "test2", "test3", "test4"]

describe("verifyModule", () => {
  it("should return true if module has specified functions", () => {
    expect( () => {verifyModule(mockModule, mockFields)} ).to.not.throw()
  })

  it("should throw if property is not a function", () => {
    mockModule.test4 = "Hello!"
    expect( () => {verifyModule(mockModule, mockFields)} ).to.throw()
    mockModule.test4 = function(){}
  })

  it("should throw if module is missing a function", () => {
    mockModule.test4 = undefined
    expect( () => {verifyModule(mockModule, mockFields)} ).to.throw()
    mockModule.test4 = function(){}
  })
})
