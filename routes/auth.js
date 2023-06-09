const express = require('express');

// import all controllers

const authCtrl = require('../controllers/auth');

const auth = require('../middlewares/auth');

const routes = express.Router();

// Add routes
routes.post('/',auth, authCtrl.store);
routes.post('/mobile', authCtrl.mobileStore);
routes.post('/auth', authCtrl.login);
routes.get('/auth', auth, authCtrl.auth);
routes.put('/', auth,authCtrl.update);
routes.put('/mobile/:id',authCtrl.updateMobile);
routes.get('/code', authCtrl.sendCode);
routes.get('/all', auth,authCtrl.all);
routes.get('/allServiceByFather', auth,authCtrl.allServiceByFather);
routes.get('/allMedecinByFather', auth,authCtrl.allMedecinByFather);
routes.post('/code', authCtrl.verifCode);


module.exports = routes;
