const express = require('express');

const router = express.Router();

router.use('/track', require('./track'));

module.exports = router;
