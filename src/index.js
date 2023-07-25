const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {PORT} = require('./config/serverconfig');
const ApiRoutes = require('./routes/index');
const db = require('./models/index');

const setupAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', ApiRoutes);
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alert:true});
        }
    })
}
setupAndStartServer();