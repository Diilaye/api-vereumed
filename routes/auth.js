const express = require('express');

// import all controllers

const authCtrl = require('../controllers/auth');

const auth = require('../middlewares/auth');

const routes = express.Router();

// Add routes
routes.post('/',auth, authCtrl.store);
routes.post('/auth', authCtrl.login);
routes.put('/:id', auth,authCtrl.update);
routes.get('/code', authCtrl.sendCode);
routes.get('/all', auth,authCtrl.all);
routes.post('/code', authCtrl.verifCode);


module.exports = routes;
