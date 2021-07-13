const controller = require('../controllers/car_controller.js');

module.exports = function(app){
    const field = '/car';
    app.get(field+'/get-all-cars',controller.getCars);
}