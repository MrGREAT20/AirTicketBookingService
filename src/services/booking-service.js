const {BookingRepository} = require('../repository/index');
const {FLIGHT_SERVICE_PATH} = require('../config/serverconfig');
const axios = require('axios');
const { ServiceError } = require('../utils/errors');
class BookingService {
    constructor(){
        this.bookingrepository = new BookingRepository();
    }
    async CreateBooking(data){
        try {
            const flightId = data.flightId;
            let getFlightRequesturl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequesturl); 
            //response variable me JSON me conversion ka error aa rha hai
            //axios normal data ke saath saath kuch or info bhi deta hai, lekin humara main cheez toh
            //response.data me hai 

            //lekin response.data me kuch or non useful cheeze hai usko bhi nikalne ke liye
            //return karo response.data.data
            const flightdata = response.data.data;
            let priceofTheFlight = flightdata.price;
            if(data.NoOfSeats > flightdata.totalSeats){
                throw new ServiceError('Something went Wrong in the Booking Process', 'Insufficient Seats');
            }
            const TotalCost = priceofTheFlight * data.NoOfSeats;
            const bookingPayload = {...data, TotalCost}; //object destructuring
            const booking = await this.bookingrepository.create(bookingPayload);
            //idhar upar Create se humne "Booking" table me ek nayi booking daaldi

            console.log(booking);
            let updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;

            //abhi humne flights DB me bhi changes karne hai, since humne voh flight ke kuch seats badhaye
            await axios.patch(updateFlightRequestUrl, {totalSeats: flightdata.totalSeats - booking.NoOfSeats});
            await this.bookingrepository.update(booking.id, {status: "Booked"});
            return booking;
        } catch (error) {
            if(error.name === 'RepositoryError' || error.name === 'ValidationError'){
                throw error; //because it is not a service error, so for errors which are not at service layer we should directly
                //throw the error
            }
            throw new ServiceError();
        }

    }
}
module.exports = BookingService;