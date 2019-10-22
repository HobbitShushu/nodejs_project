const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/index');

const check_session = require('../middleware/check_session');

// user main page
router.get('/:name', IndexController.main_get_page);

// main page - get image
router.get('/:name/:id', IndexController.main_get_image);

module.exports = router;