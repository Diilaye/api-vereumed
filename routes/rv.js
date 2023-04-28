const express = require('express');


const auth = require('../middlewares/auth');

// import all controllers
const  rvCtrl =  require('../controllers/rv');


const routes = new express.Router();

// Add routes
routes.get('/', rvCtrl.all);
routes.get('/:id', rvCtrl.one);
routes.post('/',auth,rvCtrl.store);
routes.delete('/:id', rvCtrl.delete);

module.exports = routes;
