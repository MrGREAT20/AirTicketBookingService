const express = require('express');
const router = express.Router();
const v1Apiroutes = require('./v1/index');

router.use('/v1', v1Apiroutes);

module.exports = router;