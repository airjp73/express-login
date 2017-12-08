var nodemailer = require('nodemailer')
var Email = require('email-templates')
var path = require('path')

var transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASS
  }
})

var emailOptions = {
  message: {
    from: "AaronP <aaron@bob.com>"
  },
  transport: transporter
}

module.exports = emailOptions
