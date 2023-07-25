const express = require('express');
const {BookingController} = require('../../controllers/index');
const router = express.Router();
router.post('/bookings', BookingController.Create);
module.exports = router;