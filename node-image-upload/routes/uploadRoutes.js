const express = require('express');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

router.post('/', uploadController.uploadImages)

module.exports = router;

