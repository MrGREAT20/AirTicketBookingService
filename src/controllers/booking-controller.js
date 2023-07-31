const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const bookingservice = new BookingService();
const {createChannel, publishMessage} = require('../utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('../config/serverconfig');

class BookingController {
    constructor(){
    }
    async sendMessageToQueue(req, res){
        const channel = await createChannel();
        const data = {message: "Message is success"};
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message:'Successfully published the event'
        });
    }

    async create (req, res) {
        try {
            const response = await bookingservice.CreateBooking(req.body);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: 'Successfully Completed Booking',
                err: {},
                data: response
            })
        } catch (error) {
            return res.status(error.statusCodes).json({
                success: false,
                message: error.message,
                err: error.explanation,
                data: {}
            });
        }
    }
}
module.exports = BookingController;
//module.exports = {Create};