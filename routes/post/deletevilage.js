var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconnect = require('../dbconnect');
var con = mysql.createConnection({
    /* host: "localhost",
    user: "root",
    password: "",
    database: "onegeosoft" */
    host: "203.154.82.62",
    user: "user",
    password: "!Ogs1234",
    database: "mis"
});
// var coreF = require('../coreF');
/* POST users listing. */
router.post('/', function (req, res, next) {
    console.log('deletevilage start!!')
    var json = req.body;
    let vilage_id = json.vilage_id
    let username = json.username

    console.log(vilage_id + " " + username);
    try {
        if (req.body) {
            //Delete Vilage
            var deleteVilageQry = 
            `
            UPDATE vilage
            SET
                ACTIVE = "N"
                ,   upd_by = "${username}"
                ,   upd_date = NOW()
            WHERE vilage_id = "${vilage_id}"
            `
            console.log(deleteVilageQry)
            con.query({sql:deleteVilageQry}, function (err, result) {
                if (err) throw err;
                console.log("Vilage table " + result.affectedRows + " record(s) deleted");
            });
            

            //Delete Vilage Area
            var deleteVilageAreaQry = 
            `
            UPDATE vilage_area
            SET
                ACTIVE = "N"
                ,   upd_by = "${username}"
                ,   upd_date = NOW()
            WHERE vilage_id = "${vilage_id}"
            `
            console.log(deleteVilageAreaQry)
            con.query({sql:deleteVilageAreaQry}, function (err, result) {
                if (err) throw err;
                console.log("Vilage Area table " + result.affectedRows + " record(s) deleted");
            });

            //Delete Vilage Slum
            var deleteVilageSlumQry = 
            `
            UPDATE vilage_slum
            SET
                ACTIVE = "N"
                ,   upd_by = "${username}"
                ,   upd_date = NOW()
            WHERE vilage_id = "${vilage_id}"
            `
            console.log(deleteVilageSlumQry)
            con.query({sql:deleteVilageSlumQry}, function (err, result) {
                if (err) throw err;
                console.log("Vilage Slum table " + result.affectedRows + " record(s) deleted");
            });

            //Delete Vilage Soil
            var deleteVilageSoilQry = 
            `
            UPDATE vilage_soil
            SET
                ACTIVE = "N"
                ,   upd_by = "${username}"
                ,   upd_date = NOW()
            WHERE vilage_id = "${vilage_id}"
            `
            console.log(deleteVilageSoilQry)

            con.query({sql:deleteVilageSoilQry}, function (err, result) {
                if (err) throw err;
                
                console.log("Vilage Soil table " + result.affectedRows + " record(s) deleted");
                
            });
            res.json({ status: "ok"});
        } else {
            res.json({
                status: "Request Body Access Deny"
            })
        }
    } catch (error) {
        res.json({ status: "Catch Error Access Deny" });
    }
});

module.exports = router;
