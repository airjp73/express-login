# express-reuse
A lightweight framework that makes reusing pieces of your express app easy. For detailed documentation, go [here](https://github.com/airjp73/express-reuse/wiki)

##  Getting Started
The simplest way to use `express-reuse` is to install a strategy. For now, let's use [`express-reuse-local-login`](https://github.com/airjp73/express-reuse-local-login).

```
$ npm install express-reuse
$ npm install express-reuse-local-login
```

Steps:
1. [Set up necessary middleware](#set-up-necessary-middleware)
2. [Configure Email](#configure-email) (optional)
3. [Connect to your database](#connect-to-database)
4. [Put it all together](#put-it-all-together)

### Set up necessary middleware

`express-reuse` requires you to use at least [`body-parser`](https://www.npmjs.com/package/body-parser), [`cookie-parser`](https://www.npmjs.com/package/cookie-parser), and some sort of session handling middleware. In this case we're using [`express-session`](https://www.npmjs.com/package/express-session).

```javascript
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressSession({
  secret : /* Your session secret */ ,

  //these can be true or false
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}))
```

### Configure Email

This step is optional. If you don't want to use transactional emails, simply include `noEmail: true` in the options object when we set up `express-reuse`.

For a more detailed explanation on what can be done here, see the documentation for [`email-templates`](https://github.com/niftylettuce/email-templates). The emailOptions object we create in this section gets passed directly to `email-templates`.

First we need a [`nodemailer`](https://www.npmjs.com/package/nodemailer) transport. This example uses [ethereal.email](https://ethereal.email/).

```javascript
var transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: /* your email    */,
    pass: /* your password */
  }
})
```

Next we need to setup a folder with our email templates. The templates we need will depend on the strategy being used. In this case, `express-reuse-local-login` requires four templates.

```
emails
  - emailConfirm
  - emailConfirmThankYou
  - forgotPassword
  - passwordChanged
```

See the [`email-templates`](https://github.com/niftylettuce/email-templates) documentation for a more detailed explanation about how to set these up.

Finally, we create our emailOptions object.

```javascript
var emailOptions = {
  views: {
    root: /* directory containing email templates */
  },
  message: {
    from: "noreply@yourapp.com"
  },
  transport: transporter
}
```

### Connect to database

Out of the box, `express-reuse` works with [`mongoose`](https://www.npmjs.com/package/mongoose). But it can be easily configured to work with any database you want. If you want to work with another database module, see the documentation [here](#placeholder).

First, connect to the database.

```javascript
mongoose.connect( /* Your database URL */)
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log("Can not connect to the database" + err)
  })
```

Then create a `mongoose` User model. The fields that need to be in the model will depend on the particular strategy being used. For `express-reuse-local-login` your schema will look like this.

```javascript
var userSchema = new mongoose.Schema({
  email:                {type: String,  select: false},
  password:             {type: String,  select: false},

  //optional if not using transactional emails
  confirmEmailToken:    {type: String,  select: false},
  resetPasswordToken:   {type: String,  select: false},
  resetPasswordExpires: {type: Date,    select: false},
  emailConfirmed:       {type: Boolean, select: false, default: false},

  /* Other fields related specifically to your app */
})

var User = mongoose.model("User", userSchema)
```

It is not required that the fields be set to `select:false`. This just shows that the strategy will work correctly even if you do.

### Put it all together

Now we're ready to setup `express-reuse`. First require the packages:

```javascript
var expressReuse           = require('express-reuse')
var expressReuseLocalLogin = require('express-reuse-local-login')
```

Then we tell `express-reuse` to use the local login strategy.

```javascript
expressReuse.useStrategy(expressReuseLocalLogin)
```

Now we `app.use()` and provide our options object to `express-reuse`. The options object contains the User model and emailOptions we set up earlier.

```javascript
app.use("/auth", expressReuse({
  userModel: User,

  //For transactional emails
  emailOptions: emailOptions

  //For no emails
  noEmail: true
})
```

### Customization

`express-reuse` is fully configurable and customizable. For more information, see the [documentation](https://github.com/airjp73/express-reuse/wiki).
