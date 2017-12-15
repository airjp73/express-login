var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
var sinon = require('sinon')

var app = require('../../exampleServer/server.js')
var server = {}
var User = require("../../exampleServer/models/user.js")
var encrypt = require("../helpers/encryption.js")

const TEST_USER = {
  email: "mrTestUser@test.com",
  profileName: "Mr. Test",
  password: "myTestPass",
  newPassword: "myNewTestPass",
  confirmEmailToken: "testtest"
}
var mockUser = async () => {
  var testUser = new User()
  testUser.email = TEST_USER.email
  testUser.password = encrypt.hashPassword(TEST_USER.password)
  return await testUser.save()
}

describe("authRouter", () => {
  beforeEach(() => {
    server = chai.request.agent(app)
  })

  it("should return 401 if not logged it", async () => {
    var res = await server.get("/test/testRoute")

    expect(res).to.have.status(401)
  })

  it("should return 200 if logged in", async () => {
    await mockUser()
    var fields = {
      email: TEST_USER.email,
      password: TEST_USER.password
    }

    await server.post("/auth/login").send(fields)
    var res = await server.get("/test/testRoute")

    expect(res).to.have.status(200)
  })
})
