const mysql = require('mysql');
const config = require('./configs.js');


const mysqlConnection = mysql.createConnection({
    user: config.mysql.user,
    password: config.mysql.password,
    host: config.mysql.host,
    port: config.mysql.port,
    database: config.mysql.dbname,
});

mysqlConnection.connect((err)=>{
    if(err) console.log(err.toString());
    console.log('Mysql Server Connection Successful');
});

module.exports = mysqlConnection;