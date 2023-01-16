const express = require('express');
const pointsCtrl = require('../controllers/points.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID=0;
const pointsRoute = express.Router();

//Route for points Module
pointsRoute.get('/api/points/get', verifyAccess(MODULE_ID),pointsCtrl.display);
pointsRoute.post('/api/points/insert',verifyAccess(MODULE_ID), pointsCtrl.insert);
pointsRoute.get('/api/points/get/:id', pointsCtrl.get);
pointsRoute.put('/api/points/update/:id',verifyAccess(MODULE_ID), pointsCtrl.update);
pointsRoute.delete('/api/points/remove/:PID', verifyAccess(MODULE_ID),pointsCtrl.delete);

module.exports = pointsRoute;