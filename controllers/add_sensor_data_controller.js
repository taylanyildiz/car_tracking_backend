const mysql = require('../configs/mysql_config.js');
const mqtt = require('../configs/mqtt_config.js');

module.exports = () => {
    var imeiList = [];
    mqtt.mqttConnection.on('message', (topic, message) => {
        var imei = topic.split('/')[0];
        if (imeiList.indexOf(imei) < 0) {
            imeiList.push(imei);
            console.log(imei);
        }
        const decodeMsg = JSON.parse(message);
        for (let index = 0; index < decodeMsg.length; index++) {
            const keys = Object.keys(decodeMsg[index]);
            const values = Object.values(decodeMsg[index]);
            for (let subIndex = 0; subIndex < keys.length; subIndex++) {
                const data_key = keys[subIndex];
                const data_value = values[subIndex];
                console.log(`${imei} : ${data_key} : ${data_value}`);

                const sql = `INSERT INTO ${imei}_${data_key} (value) VALUES(${data_value})`;
                mysql.query(sql,(err,result)=>{
                    if(err){
                        console.log(err.toString());
                    }
                    console.log(result);
                });

            }
        }
    });
}