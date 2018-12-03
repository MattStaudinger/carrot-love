const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  module.exports = router;