try{
const express = require('express');
const dashRoute = require('../routes/dashboard.route');
const brandRoute = require('../routes/brand.route');
const categRoute = require('../routes/category.route');
const productRoute = require('../routes/product.route');
const attrRoute = require('../routes/attribute.route');
const attrValRoute = require('../routes/attributevalue.route');
const supplierRoute = require('../routes/supplier.route');
const ordersRoute = require('../routes/order.route');
const inventoryRoute = require('../routes/inventory.route');
const poRoute = require('../routes/purchaseorder.route');
const grRoute = require('../routes/goodsreceipt.route');
const apRoute = require('../routes/apinvoice.route');
const paymentRoute = require('../routes/payment.route');
const discountRoute = require('../routes/discount.route');
const taxRoute = require('../routes/tax.route');
const compProfileRoute = require('../routes/companyprofile.route');
const lgnrolesRoute = require('../routes/loginroles.route');
const importExcelRoute = require('../routes/importfromexcel.route');
const faqRoute = require('../routes/faq.route');
const auditRoute = require('./audit.route');
const reportsRoute = require('../routes/reports.route');

const mainRoute = express.Router();

mainRoute.use(dashRoute);
mainRoute.use(brandRoute);
mainRoute.use(categRoute);
mainRoute.use(productRoute);
mainRoute.use(attrRoute);
mainRoute.use(attrValRoute);
mainRoute.use(supplierRoute);
mainRoute.use(ordersRoute);
mainRoute.use(inventoryRoute);
mainRoute.use(poRoute);
mainRoute.use(grRoute);
mainRoute.use(apRoute);
mainRoute.use(paymentRoute);
mainRoute.use(discountRoute);
mainRoute.use(taxRoute);
mainRoute.use(lgnrolesRoute);
mainRoute.use(importExcelRoute);
mainRoute.use(compProfileRoute);
mainRoute.use(faqRoute);
mainRoute.use(auditRoute);
mainRoute.use(reportsRoute);

module.exports = mainRoute;
}
catch{
    alert("Session expired. Please Login Again.")
}