const express = require('express');
const importfromExlCtrl = require('../controllers/importfromExl.controller');

const importfromExlRoute = express.Router();

importfromExlRoute.get('/api/importfromExl/insert', importfromExlCtrl.AddfromExcel);

module.exports = importfromExlRoute;
