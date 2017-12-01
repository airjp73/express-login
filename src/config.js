//Config object with all default parameters




module.exports = {
  constants: require('./constants.js'),

  /////////Database Access
  //Provide a userModel (mongoose schema) in options
  //and default getUser and saveUser will access that
  //
  //Another options is to override getUser and saveUser
  //which allows any database to be used
  //
  database: require('./database.js'),


  /////////Emails
  //Provide an email-templates object and
  //transactional emails will automatically be sent
  //
  //If you don't want any emails sent, set noEmail to true
  //in order to hide the warning message
  //
  //Set logEmails to false if you don't want to console.log
  //every time an email is sent
  //
  mailer: require('./mailer.js')

}
