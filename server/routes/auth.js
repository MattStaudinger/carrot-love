const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")
// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs")
const bcryptSalt = 10;
const nodemailer = require('nodemailer');
var cron = require('cron');
const webpush = require("web-push")

// new CronJob('* * * * * *', function() {
//   console.log('You will see this message every second');
// }, null, true, 'America/Los_Angeles');



router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body



  if (!username || !password || !email) {
    res.status(400).json({ message: "Indicate username, email and password" })
    return
  }

  User.findOne({ username })
    .then(userDoc => {
      
      if (userDoc !== null) {
        res.status(409).json({ message: "The username already exists" })
        return
      } else {
        
      }
    })
    .then(() => {
    User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The email already exists" })
        return
      } 
        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)
        const newUser = new User({ username, password: hashPass, email })
        return newUser.save()
    })
    .then(userSaved => {
       
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined;
        res.json( userSaved );
      });
    })
    })
    .catch(err => next(err))
})


router.post("/login", (req, res, next) => {
  const { email, password } = req.body
  // first check to see if there's a document with that email
  User.findOne({ email })
    .then(userDoc => {
      // "userDoc" will be empty if the email is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Incorrect email "))
        return
      }
      // second check the password
      // "compareSync()" will return false if the "password" is wrong
      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Password is wrong"))
        return
      }

      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.encryptedPassword = undefined
        res.json(userDoc)
      })
    })
    .catch(err => next(err))
})

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        return
      }

      // We are now logged in (notice req.user)
      res.json(req.user)
    })
  })(req, res, next)
})

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('https://carrotlove.herokuapp.com/login/callback'); 
  });

  
router.get('/auth/google',
passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']})); //'https://www.googleapis.com/auth/calendar'
//https://www.googleapis.com/auth/plus.login
// router.get("/auth/google/callback", passport.authenticate("google", {
//   failureRedirect: "/",
//   successRedirect: "/private-page"
// }));


router.get("/logout", (req, res) => {
  req.logout()
  res.json({ message: 'You are out!' })
})

router.post('/mail-notification', (req, res, next) => {
  let { email, dates } = req.body;
  console.log(email)
  let message="Hi"
  let subject="Greeting"
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_MAIL,
      pass: process.env.GMAIL_PW
    }
  });
      

     let x = new cron.CronJob("* * * * *", function() { 
       console.log("Sent")
  //   transporter.sendMail({
  //   from: '"Carrot Love <carrotlove@gmail.com>',
  //   to: email, 
  //   subject: subject, 
  //   text: message,
  //   html: `<b>${message}</b>`
  // })
  // .catch(error => console.log(error))
}, null, false, 'Europe/London')
let time = new Date()
//starting of Job at the time the user has entered
new cron.CronJob(time, function() {
  console.log("Test")
x.start()}, null, true, 'Europe/London')

})



module.exports = router
