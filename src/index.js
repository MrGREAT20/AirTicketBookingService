const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {PORT} = require('./config/serverconfig');
const ApiRoutes = require('./routes/index');
const db = require('./models/index');

const setupAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/bookingservice/api', ApiRoutes);
    // this we changed because of the API gateway
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    })
}
setupAndStartServer();