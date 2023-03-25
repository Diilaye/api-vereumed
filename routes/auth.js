const express = require('express');

// import all controllers

const authCtrl = require('../controllers/auth');

const routes = express.Router();

// Add routes
routes.post('/', authCtrl.store);
routes.put('/:id', authCtrl.update);
routes.get('/code', authCtrl.sendCode);
routes.post('/code', authCtrl.verifCode);


module.exports = routes;
