const express = require('express');


// import all controllers
const  transactionCtrl =  require('../controllers/transactions');

const paiementMiddleware = require('../middlewares/wave-orange-paiement');

const orangeAuth  = require('../middlewares/orange-auth');

const auth =  require('../middlewares/auth')


const routes = new express.Router();

// Add routes
routes.get('/', auth,transactionCtrl.all);
routes.post('/',auth,orangeAuth,paiementMiddleware,transactionCtrl.store);
routes.get('/successOrange',transactionCtrl.successOrange);
routes.get('/errorOrange',transactionCtrl.errorOrange);
routes.get('/success-wave',transactionCtrl.successWave);
routes.get('/error-wave',transactionCtrl.errorWave);
routes.get('/:id',auth, transactionCtrl.one);
routes.post('/',auth,orangeAuth,paiementMiddleware,transactionCtrl.store);
routes.delete('/:id', auth,transactionCtrl.delete);

module.exports = routes;
    
//