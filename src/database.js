var userModelErrorMessage = "express-login -- no database access provided. Provide a userModel (mongoose.Schema) or override getUser and saveUser"

module.exports = {
  userModel: undefined,
  async getUser(selection, projection = "") {
    if ( !this.userModel )
      throw new Error(userModelErrorMessage)

    var projectionString = projection.join(" ")
    var user = await this.userModel.findOne(selection, projectionString)
    return user
  },
  async newUser(userData) {
    if ( !this.userModel )
      throw new Error(userModelErrorMessage)

    var user = new this.userModel()
    Object.assign(user, userData)
    return await user.save()
  },
  async updateUser(user) {
    if ( !this.userModel )
      throw new Error(userModelErrorMessage)

    user.save()
  }
}
