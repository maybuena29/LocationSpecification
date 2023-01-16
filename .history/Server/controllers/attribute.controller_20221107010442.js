const e = require('express');
const db = require('../main.db');
const audit = require('./auditlog.controller');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM tblattributes";
    // const resetID = "ALTER TABLE tblattributes AUTO_INCREMENT = 1";

    db.query(sqlSelect, (err, result) => {
        // if(result[0] === undefined){
        //     //Query to reset id
        //     db.query(resetID, (err) => {
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log('id reset');
        //         }
        //     })
        // }else{
        //     res.send(result);
        //     console.log(result[0]);
        // }
        res.send(result);
        console.log(result[0]);
    });
};

function insertData(req, res){
    
    const attrName = req.body.AttrName;
    const Status = req.body.AttrStatus;

    const sqlInsert = "INSERT INTO tblattributes (Attribute_Name, AttrStatus) VALUES (?,?)";

    db.query(sqlInsert, [attrName, Status], (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            console.log(result);
            logs={
                AuditUserCode:req.session.user.id,
                
                AuditModule:"Product-Attributes",
                AuditAction:`Inserted Attribute: ${attrName}`
            }
            audit.logger(logs);
        }
        
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblattributes WHERE Attr_ID = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
    
    console.log(id);
}

function updateData(req, res){
    const id = req.params.id;
    const attrName = req.body.AttrName;
    const Status = req.body.AttrStatus;

    const sqlSelect = "UPDATE tblattributes SET Attribute_Name = ?, AttrStatus = ? WHERE Attr_ID = ?";

    db.query(sqlSelect, [attrName, Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        console.log(result);
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Product-Attributes",
            AuditAction:`Updated Attribute: ${attrName} (${id})`
        }
        audit.logger(logs);
        }
        
    });
}

function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblattributes WHERE Attr_ID = ?";

    async function getName(){
        async function query(){
            return new Promise((resolve, reject)=>{
                 db.query("SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = ?",[id],(err,result)=>{
                    if (err){
                        reject(err);
                    }
                    else{
                        resolve(result[0]);
                    }
                })
           })
        }
        const result = await query();
        return result;
        
    }

    const obtainedName = await getName();

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            logs={
                AuditUserCode:req.session.user.id,
               
                AuditModule:"Product-Attributes",
                AuditAction:`Deleted Attribute: ${obtainedName} (${id})`
            }
            audit.logger(logs);
        }
        
    });
}

//Get the active status
function getAttribute(req, res){
    const sqlSelect = "SELECT Attr_ID, Attribute_Name FROM tblattributes WHERE AttrStatus = 'active'"
  
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    delete: deleteData,
    getAttr: getAttribute,
}