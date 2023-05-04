const express = require('express');


// import all controllers
const  transactionCtrl =  require('../controllers/transactions');

const paiementMiddleware = require('../middlewares/wave-orange-paiement');

const orangeAuth  = require('../middlewares/orange-auth');


const routes = new express.Router();

// Add routes
routes.get('/', transactionCtrl.all);
routes.post('/',orangeAuth,paiementMiddleware,transactionCtrl.store);
routes.get('/successOrange',transactionCtrl.successOrange);
routes.get('/successWave',transactionCtrl.successWave);
routes.get('/errorOrange',transactionCtrl.errorOrange);
routes.get('/errorWave',transactionCtrl.errorWave);
routes.get('/:id', transactionCtrl.one);
routes.post('/',orangeAuth,paiementMiddleware,transactionCtrl.store);
routes.delete('/:id', transactionCtrl.delete);

module.exports = routes;
    
    