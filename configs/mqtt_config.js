const mqtt = require('mqtt');
const mysqlConnection = require('./mysql_config.js');
const config = require('./configs.js');


const option = config.mqtt.option;
const host = config.mqtt.host;

const mqttConnection = mqtt.connect(host, option);

mqttConnection.on('connect', (err) => {
    if (err) console.log(err.toString());
    console.log('Mqtt Connected');
    mqttConnection.subscribe('+/data', () => console.log('Subscribe [+/data]'));
});


module.exports = { mqttConnection };