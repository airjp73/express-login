var noEmailErrorMessage = "WARNING: express-login -- Emails not set up. Please provide email-templates object or set noEmail to true to silence this warning."

module.exports = {
  email: {},
  noEmail: false,
  logEmails: true,
  async sendEmail(template, target, vars) {
    //check that email is set up
    if (!this.email || Object.keys(this.email).length == 0) {
      if (!this.noEmail)
        console.warn(noEmailErrorMessage)
      return
    }

    var info = await this.email.send({
      template: template,
      message: {
        to: target
      },
      locals: vars
    })

    if (this.logEmails)
      console.log("Message sent: %s", info.messageId)

    return info
  }
}
