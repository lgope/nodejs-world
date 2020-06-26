const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware');

// story model
const Story = require('../models/StoryModel');

// @desc    login/landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc  dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    console.log(stories);
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
