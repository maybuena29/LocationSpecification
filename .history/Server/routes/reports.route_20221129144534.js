const express = require('express');
const reportCtrl = require('../controllers/reports.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 0;
const reportsRoute = express.Router();

//Route for Category Module
reportsRoute.get('/api/reports/get/verify',verifyAccess(0),reportCtrl.displayEarnings);
reportsRoute.get('/api/reports/get/totalearnings',reportCtrl.displayEarnings);
reportsRoute.get('/api/reports/get/totalsales',reportCtrl.displaySales);
reportsRoute.get('/api/reports/get/totalproducts', reportCtrl.displayProducts);
reportsRoute.get('/api/reports/get/totalorders', reportCtrl.displayOrder);
reportsRoute.get('/api/reports/get/totalexpired', reportCtrl.displayExpired);
reportsRoute.get('/api/reports/get/totalexpenses', reportCtrl.displayExpense);
reportsRoute.get('/api/reports/get/totalstocks',  reportCtrl.displayStocks);
reportsRoute.get('/api/reports/get/itemsales/daily/data',  reportCtrl.displayItemDailySales);
reportsRoute.get('/api/reports/get/itemsales/weekly/data',  reportCtrl.displayItemWeeklySales);
reportsRoute.get('/api/reports/get/itemsales/monthly/data',  reportCtrl.displayItemMonthlySales);
reportsRoute.get('/api/reports/get/itemsales/yearly/data',  reportCtrl.displayItemYearlySales);
reportsRoute.get('/api/reports/get/earnings/daily/data',  reportCtrl.dailyEarnings);
reportsRoute.get('/api/reports/get/earnings/weekly/data',  reportCtrl.weeklyEarnings);
reportsRoute.get('/api/reports/get/earnings/monthly/data',  reportCtrl.monthlyEarnings);
reportsRoute.get('/api/reports/get/earnings/yearly/data',  reportCtrl.yearlyEarnings);
reportsRoute.get('/api/reports/get/total/productorder/data',  reportCtrl.topProductOrder);
reportsRoute.get('/api/reports/get/brand/sales/data',  reportCtrl.brandSales);
reportsRoute.get('/api/reports/get/category/sales/data',  reportCtrl.categorySales);
reportsRoute.get('/api/reports/get/daily/orders/data',  reportCtrl.dailyOrders);
reportsRoute.get('/api/reports/get/weekly/orders/data',  reportCtrl.weeklyOrders);
reportsRoute.get('/api/reports/get/monthly/orders/data',  reportCtrl.monthlyOrders);
reportsRoute.get('/api/reports/get/yearly/orders/data',  reportCtrl.yearlyOrders);
reportsRoute.get('/api/reports/get/totalproduct/category/data',  reportCtrl.totalProdPerCateg);

//For Supplier Reports
reportsRoute.get('/api/reports/get/total/supplier', reportCtrl.displaySupplier);
reportsRoute.get('/api/reports/get/total/po', reportCtrl.displayPO);
reportsRoute.get('/api/reports/get/total/grpo', reportCtrl.displayGRPO);
reportsRoute.get('/api/reports/get/total/apinvoice', reportCtrl.displayAPInvoice);

module.exports = reportsRoute;