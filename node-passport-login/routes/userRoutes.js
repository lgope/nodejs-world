const express = require('express');
const passport = require('passport');

const { forwardAuthenticated } = require('../config/authConfig');

const router = express.Router();
const User = require('../models/userModel');

// router.get('/', (req, res) => {
//   res.send('Hello World 🌏🎉');
// });

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// signup Page
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

router.post('/signup', async (req, res) => {
  
  let errors = [];
  const { name, email, password, password2 } = req.body;


  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 5) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.render('signup', {
      errors,
      name,
      email,
      password,
      password2,
    });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      errors.push({ msg: 'Email already exists' });
      return res.render('signup', {
        errors,
        name,
        email,
        password,
        password2,
      });
    }

    await User.create({
      name,
      email,
      password,
    });

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/users/login');
  } catch (error) {
    console.log(`Error : ${error}`);
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
