var userModelErrorMessage = "express-login -- no database access provided. Provide a userModel (mongoose.Schema) or custom database module"

module.exports = {
  init(options) {
    if (!options.userModel)
      throw new Error(userModelErrorMessage)
    this.userModel = options.userModel
  },

  userModel: undefined,
  async getUser(selection, projection = []) {
    if ( !this.userModel )
      throw new Error(userModelErrorMessage)

    var projectionString = projection.join(" ")
    return await this.userModel.findOne(selection, projectionString)
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

    return await user.save()
  }
}
