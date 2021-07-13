const mysqlConnection = require('../configs/mysql_config.js');

const getCars = (req, res) => {
    var imeiList = [];
    const sql = 'SELECT t1.device_imei, t2.iot_data_key, t3.sensor_name FROM devices t1 INNER JOIN iot_data t2 ON t1.device_id = t2.device_id INNER JOIN sensors t3 ON t2.sensor_id = t3.sensor_id WHERE t1.device_type_id = 1';
    mysqlConnection.query(sql, (err, result) => {
        if (err) {
            console.log(err.toString());
            res.status(400).json({ message: err });
        }

        for (let index = 0; index < result.length; index++) {
            var element = result[index].device_imei;
            if (imeiList.indexOf(element) < 0) {
                imeiList.push(element);
            }
        }
        cars = { cars: [] };
        for (let index = 0; index < imeiList.length; index++) {
            const firstElement = imeiList[index];
            const singleCar = { imei: firstElement, sensors: [] };
            for (let subIndex = 0; subIndex < result.length; subIndex++) {
                const secondElement = result[subIndex];
                if (firstElement === secondElement.device_imei) {
                    const singleSensor = { sensor_key: secondElement.iot_data_key, sensor_data: secondElement.sensor_name };
                    singleCar.sensors.push(singleSensor);
                }
            }
            cars.cars.push(singleCar);
        }
        res.status(200).json(cars);
    });
};

module.exports = { getCars };