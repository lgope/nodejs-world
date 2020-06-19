const express = require('express');
const router = express.Router();

// @desc    login/landing page
// @route   GET /
router.get('/', (req, res) => {
  //   res.render('login', {
  //     layout: 'login',
  //   });
  res.send('Login Page');
});

// @desc  dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
  res.send('Dashboard Page');
});
// router.get('/dashboard', ensureAuth, async (req, res) => {
//   try {
//     const stories = await Story.find({ user: req.user.id }).lean();
//     res.render('dashboard', {
//       name: req.user.firstName,
//       stories,
//     });
//   } catch (err) {
//     console.error(err);
//     res.render('error/500');
//   }
// });

module.exports = router;
