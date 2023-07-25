const {StatusCodes} = require('http-status-codes');

class ServiceError extends Error{
    constructor(
        message = 'Something went Wrong',  //default message will be this if not given during object creation 
        explanation = 'Service layer Error', //default explanation will be this if not given during object creation
        statusCodes = StatusCodes.INTERNAL_SERVER_ERROR
    ) 
    {
        super();
        this.name = 'ServiceError',
        this.message = message,
        this.explanation = explanation,
        this.statusCodes = statusCodes

    }
}
module.exports = ServiceError;