const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const bookingservice = new BookingService();
const Create = async (req, res) => {
    try {
        const response = await bookingservice.CreateBooking(req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully Completed Booking',
            err: {},
            data: response
        });
    } catch (error) {
        return res.status(error.statusCodes).json({
            success: false,
            message: error.message,
            err: error.explanation,
            data: {}
        });
    }
}

module.exports = {Create};