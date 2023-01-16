const db = require('../main.db');
const audit = require('./auditlog.controller')


async function AddProductfromExcel(req, res){

function StartTransaction(req,res){
        
                const sqlStartTransaction = "START TRANSACTION;";
                db.query(sqlStartTransaction, (err, result) => {
                    if (err) {console.log(err); }
                    else{
                    console.log(result);
                }
                
                });
            }

            function RollbackTransaction(req,res){
        
                const sqlStartTransaction = "ROLLBACK;";
                db.query(sqlStartTransaction, (err, result) => {
                    if (err) {console.log(err); }
                    else{
                    console.log(result);
                }
                
                });
            }

            function CommitTransaction(req,res){

                const sqlStartTransaction = "COMMIT;";
                db.query(sqlStartTransaction, (err, result) => {
                    if (err) {console.log(err); }
                    else{
                    console.log(result);
                }
                
                });
            }
            

    const data = req.body.data;
    const Status = "active";

    //Attributes
    function AddAttr(){

    data.map((rows)=>{
    const sqlInsertAttribute = "INSERT INTO tblattributes (Attribute_Name, AttrStatus) VALUES (?,?)";
    
        db.query(sqlInsertAttribute, [rows.productAttribute, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
        }
         
        });
    })
    }

    //AttributeValue
    function AddAttrV(){

    data.map((rows)=>{

    const sqlInsertAttrValue = "INSERT INTO tblattributesvalue (Value_Name, Attr_Parent_ID, ValStatus) Values(?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name =?),?)";
   
    db.query(sqlInsertAttrValue, [rows.productAttrValue, rows.productAttribute, Status], (err, result) => {
        if (err) {console.log(err); }
            else{
            console.log(result);
        }
         
        
    });
        })
    }

    
    //Brand
    function AddBrnd(){
    data.map((rows)=>{
        const sqlInsertBrand = "INSERT INTO tblbrand (Brand_Name, Status) VALUES (?,?)";
        db.query(sqlInsertBrand, [rows.productBrand, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
        }
        console.log("Brand")
        });
    })
    }


    //Category
    function AddCateg(){
    data.map((rows)=>{
        const sqlInsertCategory = "INSERT INTO tblcategory (Category_Name, CatStatus) VALUES (?,?)";

        db.query(sqlInsertCategory, [rows.productCategory, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
                 }
        });
        
        })
    }

    

    //products
async function AddProd(){
    var success= 0;
      for(const rows of data){
        console.log(rows)
        const sqlInsertProduct = "INSERT INTO tblproducts (`productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, `productCategory`, `productBrand`,  `productAvailability`,`productSKU`,  `productStatus`) Values (?,?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name = ?),(SELECT Value_ID FROM tblattributesvalue Where Value_Name = ?),?,(SELECT CategoryID FROM tblcategory WHERE Category_Name=?),(SELECT BrandID from tblbrand WHERE Brand_Name =?),?,?,?) "
        
        const skuProdName = rows.productName.replace(/\s+/g, '').replace(/[^\w\s]/gi, '').substring(0,4).toUpperCase();
        const skuProdNameInitials = rows.productName.match(/\b(\w)/g).join('').toUpperCase()
        const skuAttrValue = rows.productAttrValue.split(' ').map(word => word.replace(/[^a-zA-Z0-9]/g, "")).map(word => word.replace(/[aeiou]/gi, '')).join('').toUpperCase();
        const skuPrice = rows.productPrice;
        const skuAttrName = rows.productAttribute.replace(/\s+/g, '').substring(0,1).toUpperCase();
        const skuBrand = rows.productBrand.replace(/\s+/g, '').substring(0,4).toUpperCase();
        const skuCategory= rows.productCategory.replace(/\s+/g, '').substring(0,4).toUpperCase();
       
        const productSKU = skuProdName+skuProdNameInitials+skuPrice+"-"+skuAttrName+skuAttrValue+"-"+skuBrand+"-"+skuCategory;

        async function insertProd(){
            return new Promise((resolve, reject)=>{
                db.query(sqlInsertProduct, [rows.productName, rows.productDescription, rows.productAttribute, rows.productAttrValue, rows.productPrice,rows.productCategory,
                    rows.productBrand,  rows.productAvailability, productSKU, Status] , (err,result) => {
                    if (err){
                        console.log(err)
                        resolve("ERROR")
                    }
                    else{
                        resolve("OKAY")
                        console.log("Product")
                        success++
                        console.log("Product Succeed: " + success + " out of ", rows.length);
                    }
                });
            })
        }
        const i = await insertProd()
   
      
    }
    }

    async function AddAllfromProductExcel(){
        try{
            await StartTransaction();
            await AddAttr();
            await AddAttrV();
            await AddBrnd();
            await AddCateg();
            await AddProd();
            await CommitTransaction();
        }
        catch(err){
            console.log(err);
            await RollbackTransaction();
        }
        res.send("TEST")
    }

    await AddAllfromProductExcel()
   
}
 
 function AddAttrfromExcel(req,res){
    //Attributes
  
    const data = req.body.data;
    const Status = "active";

    function AddAttr(){
    data.map((rows)=>{
    const sqlInsertAttribute = "INSERT INTO tblattributes (Attribute_Name, AttrStatus) VALUES (?,?)";
    
        db.query(sqlInsertAttribute, [rows.productAttribute, Status], (err, result) => {
            if (err) {console.log(err);}
            else{
            console.log(rows.productAttribute + " successfully added. ProductAttribute ");
        }
        console.log("Attribute");
        });
    })}
    //AttributeValue
    function AddAttrV(){
        data.map((rows)=>{
        const sqlInsertAttrValue = "INSERT INTO tblattributesvalue (Value_Name, Attr_Parent_ID, ValStatus) Values(?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name =?),?)";
       
        db.query(sqlInsertAttrValue, [rows.productAttrValue, rows.productAttribute, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
        }
             
            
        });
            })
        }

        async function AddAttribute(){
            await AddAttr();
            await AddAttrV();
        }
    }

 //Brand
 function AddBrandfromExcel(req,res){
    const data = req.body.data;
    const Status = "active";

    data.map((rows)=>{
        const sqlInsertBrand = "INSERT INTO tblbrand (Brand_Name, Status) VALUES (?,?)";
        db.query(sqlInsertBrand, [rows.productBrand, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
        }
        console.log("Brand")
        });
    })
    }
    

    //Category
function AddCategfromExcel(){
    const data = req.body.data;
    const Status = "active";

    data.map((rows)=>{
        const sqlInsertCategory = "INSERT INTO tblcategory (Category_Name, CatStatus) VALUES (?,?)";
    
        db.query(sqlInsertCategory, [rows.productCategory, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
                 }
            });
            
            })
        }

        //Supplier
    function AddSuppfromExcel(){
        const data = req.body.data;
        const Status = "active";

        data.map((rows)=>{
        const sqlInsertSupplier = "INSERT INTO tblsupplier (Supplier_ComName, Supplier_RepName, Supplier_ContNum, Supplier_Address, SuppStatus) VALUES (?,?,?,?,?)";
        db.query(sqlInsertSupplier, [rows.productSupplier,"?","?","?", Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
                }
            });
        })
    }
    


module.exports = {
    AddProduct:AddProductfromExcel,
    AddAttr:AddAttrfromExcel,
    AddBrand:AddBrandfromExcel,
    AddCateg:AddCategfromExcel,
    AddSupp:AddSuppfromExcel
    
}