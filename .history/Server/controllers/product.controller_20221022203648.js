const db = require('../main.db');
const multer = require('multer');
const express = require('express');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./uploads/productImages");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

function displayData(req, res){
    const sqlSelect="SELECT  `productID`,`productImage`, `productName`, `productDescription`, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = `productAttribute`) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = `productAttrValue`) AS `productAttrValue`, `productPrice`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = `productCategory`) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = `productBrand`) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = `productSupplier`) AS `productSupplier`, `productAvailability`, `productSKU`, `productStatus` FROM `tblproducts`";
    db.query(sqlSelect,(err,result) => {
       res.send(result);
    });
}
    

async function insertData(req, res){
    let upload = multer({ storage: storage}).single('productImage');

    upload(req, res, async function(err) {

        if (err instanceof multer.MulterError) {
            return res.send("Multer err\n"+err);
        }
        else if (err) {
            return res.send(err);
        }
        else{
            var productImage;
            console.log(req.file)
            if (!req.file){
                productImage = null;
            }
            else{
                productImage = req.file.filename;
            }
            
            const productName = req.body.productName;
            const productDescription = req.body.productDescription;
            const productAttribute = req.body.productAttribute;
            const productAttrValue = req.body.productAttrValue;
            const productPrice = req.body.productPrice;
            const productCategory = req.body.productCategory;
            const productBrand = req.body.productBrand;
            const productSupplier = req.body.productSupplier;
            const prodStatus = req.body.productStatus;
            const productAvailability = req.body.productAvailability;

            async function getBrandName(){
                async function query(){
                    return new Promise((resolve, reject)=>{
                         db.query("SELECT Brand_Name FROM tblbrand WHERE BrandID = ?",[productBrand],(err,result)=>{
                            if (err){
                                reject(err);
                            }
                            else{
                                resolve(result[0].Brand_Name);
                            }
                        })
                   })
                }

                const result = await query()
                return result.replace(/\s+/g, '').substring(0,4).toUpperCase();
            }

            async function getCategoryName(){
                async function query(){
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT Category_Name FROM tblcategory WHERE CategoryID = ?",[productCategory],(err,result)=>{
                            if (err) {
                                reject(err);
                                console.log(err);
                            }
                            else{
                                resolve(result[0].Category_Name);
                            }
                        })
                   })
                }

                const result = await query()
                return result.replace(/\s+/g, '').substring(0,4).toUpperCase();
            }

            // async function getAutoIncrementID(){
            //     async function query(){
            //         return new Promise((resolve, reject)=>{
            //             db.query("SELECT Auto_Increment FROM information_schema.TABLES WHERE TABLE_NAME = 'tblproducts'",(err,result)=>{
            //                 if (err){
            //                     reject(err);
            //                     console.log(err);
            //                 }
            //                 else{
            //                     resolve(result[0].Auto_Increment);
            //                     console.log(result[0].Auto_Increment);
            //                 }
            //             })
            //        })
            //     }
            //     const result = await query()
            //     return result;
            // }
            
            async function getAttrValue(){
                async function query(){
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = ?",[productAttrValue],(err,result)=>{
                            if (err) {
                                reject(err);
                                console.log(err);
                            }
                            else{
                                resolve(result[0].Value_Name);
                                console.log(result[0].Value_Name)
                            }
                        })
                   })
                }
                const result = await query()
                return result.split(' ').map(word => word[0]).join('').toUpperCase();
            }
            async function getAttrName(){
                async function query(){
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT Attribute_Name FROM tblattributesvalue WHERE Attr_ID = ?",[productAttribute],(err,result)=>{
                            if (err) {
                                reject(err);
                                console.log(err);
                            }
                            else{
                                resolve(result[0].Attribute_Name);
                                console.log(result[0].Attribute_Name)
                            }
                        })
                   })
                }
                const result = await query()
                return result.split(' ').map(word => word[0]).join('').toUpperCase();
            }

            const skuProdName = productName.replace(/\s+/g, '').substring(0,4).toUpperCase();
            const skuAttrValue = await getAttrValue();
            const skuBrand = await getBrandName();
            const skuCategory = await getCategoryName();
            const skuPrice = productPrice;
            const skuAttrName = 
            //const skuAIID= await getAutoIncrementID(); 

            //const productSKU = skuProdName+"-"+skuAttrValue+"-"+skuBrand+"-"+skuCategory+"-"+skuAIID;
            const productSKU = skuProdName+"-"+skuAttrValue+"-"+skuBrand+"-"+skuCategory;
            const productSKU = skuProdName+skuPrice+"-"+skuAttrName+skuAttrValue+"-"+skuBrand+"-"+skuCategory;

            const sqlInsert = "INSERT INTO tblproducts (productImage, productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand, productSupplier, productSKU, productAvailability, productStatus) Values (?,?,?,?,?,?,?,?,?,?,?,?)"
        
            db.query(sqlInsert, [productImage,productName, productDescription, productAttribute, productAttrValue, productPrice,productCategory,
                productBrand, productSupplier, productSKU, productAvailability, prodStatus] , (err,result) => {
                if (err){
                    res.send(err);
                    console.log(err);
                }
                else{
                    res.send("Inserted Successfully.");
                }
            });
        }
    })
}

function getData(req, res){
    const PID = req.params.id;

    const sqlSelectID = "SELECT * FROM `tblproducts` WHERE productID = ?";

    db.query(sqlSelectID, [PID], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
}

async function updateData(req, res){

    let upload = multer({ storage: storage}).single('productImage');

    upload(req, res, async function(err) {

        if (err instanceof multer.MulterError) {
            return res.send("Multer err\n"+err);
        }
        else if (err) {
            return res.send(err);
        }
        else{
            var productImage;
            if (!req.file){
                productImage = null;
            }
            else{
                productImage = req.file.filename;
            }
            
            const PID = req.params.id;
            const productName = req.body.productName;
            const productDescription = req.body.productDescription;
            const productAttribute = req.body.productAttribute;
            const productAttrValue = req.body.productAttrValue;
            const productPrice = req.body.productPrice;
            const productCategory = req.body.productCategory;
            const productBrand = req.body.productBrand;
            const productSupplier = req.body.productSupplier;
            const prodStatus = req.body.productStatus;
            const productAvailability = req.body.productAvailability;
            console.log("product image: " + productImage);
            console.log("product attr: " + productAttribute);
            console.log("product attr val: " + productAttrValue);
            console.log("product brand: " + productBrand);
            console.log("product categ: " + productCategory);
            console.log("product supplier: " + productSupplier);
            if (!productImage){
                // const sqlUpdate = "UPDATE tblproducts SET productName = ?, productDescription = ?, productAttribute = (SELECT Attr_ID FROM tblattributes WHERE Attribute_Name = ?), productAttrValue = (SELECT Value_ID  FROM tblattributesvalue WHERE Value_Name = ?), productPrice = ?,productCategory = (SELECT CategoryID FROM tblcategory WHERE Category_Name = ?), productBrand = (SELECT BrandID FROM tblbrand WHERE Brand_Name = ?), productSupplier = (SELECT SupplierID  FROM tblsupplier WHERE Supplier_ComName = ?), productAvailability = ?, productStatus = ? WHERE productID = ?";
                const sqlUpdate = "UPDATE tblproducts SET productName = ?, productDescription = ?, productAttribute = ?, productAttrValue = ?, productPrice = ?, productCategory = ?, productBrand = ?, productSupplier = ?, productAvailability = ?, productStatus = ? WHERE productID = ?";

                db.query(sqlUpdate, [productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand,productSupplier, productAvailability, prodStatus, PID], (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    res.send(result);
                    console.log(result);
                });
            }
            else{
                const sqlUpdate = "UPDATE tblproducts SET productImage = ?, productName = ?, productDescription = ?, productAttribute = ?, productAttrValue = ?, productPrice = ?, productCategory = ?, productBrand = ?, productSupplier = ?, productAvailability = ?, productStatus = ? WHERE productID = ?";

                db.query(sqlUpdate, [productImage, productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand,productSupplier, productAvailability,  prodStatus, PID], (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    res.send(result);
                    console.log(result);
                });
            }
        }
    })
}

function deleteData(req, res){
    const PID = req.params.PID;
    const sqlDelete="DELETE FROM tblproducts WHERE productID = ?";

    db.query(sqlDelete, PID,(err,result)=>{
        res.send(result);
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    // insertExl: insertDataExl,
    get: getData,
    update: updateData,
    delete: deleteData
}