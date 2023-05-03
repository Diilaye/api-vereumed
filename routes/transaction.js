const express = require('express');


// import all controllers
const  transactionCtrl =  require('../controllers/transactions');

const paiementMiddleware = require('../middlewares/wave-orange-paiement');

const orangeAuth  = require('../middlewares/orange-auth');


const routes = new express.Router();

// Add routes
routes.get('/', transactionCtrl.all);
routes.get('/:id', transactionCtrl.one);
routes.post('/',orangeAuth,paiementMiddleware,transactionCtrl.store);
routes.get('/success-orange',transactionCtrl.successOrange);
routes.get('/success-wave',transactionCtrl.successWave);
routes.get('/error-orange',transactionCtrl.errorOrange);
routes.get('/error-wave',transactionCtrl.errorWave);
routes.post('/',orangeAuth,paiementMiddleware,transactionCtrl.store);
routes.delete('/:id', transactionCtrl.delete);

module.exports = routes;
    
    