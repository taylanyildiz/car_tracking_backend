/// Mqtt Connection cofiguration.
require('./configs/mqtt_config.js');

/// Mysql Connection configuration.
require('./configs/mysql_config.js');

const express = require('express');
const app = express();
const router = express.Router();

const API_VERSION = '/api/v1';
const PORT = process.env.PORT || 3050;

app.use(API_VERSION,router);

/// Car get router
require('./routers/car_route')(router);

/// Add sensor data
require('./controllers/add_sensor_data_controller.js')();

app.listen(PORT,()=> console.log('Server is running '+PORT));