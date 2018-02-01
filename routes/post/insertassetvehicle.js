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

    var json = req.body;
    let userid = json.userid
    let username = json.username

    let population_idcard = json.population_idcard
    let regisdate = json.regisdate
    let vtype_id = json.vtype_id
    let vehicle_rent = json.vehicle_rent
    let distributor = json.distributor
    try {
        if (req.body) {
            var ins = 
                    `
                    INSERT INTO population_asset_vehicle
                        (
                            population_idcard
                            ,   regisdate
                            ,   vtype_id
                            ,   vehicle_rent
                            ,   distributor
                            ,   cr_by
                            ,   cr_date
                            ,   ACTIVE
                        )
                    VALUES
                        (
                            "${population_idcard}"
                            ,   "${regisdate}"
                            ,   "${vtype_id}"
                            ,   "${vehicle_rent}"
                            ,   "${distributor}"
                            ,   "${username}"
                            ,   NOW()
                            ,   "Y"
                        );
                    `
            console.log(ins)
            con.query({sql:ins},(err, result) => {
                if (err) throw err;
                console.log("population_asset_vehicle table 1 record inserted");
                res.json({
                    status: "ok"
                })
            });
        } else {
            res.json({
                status: "Request Body Access Denied"
            })
        }
    } catch (error) {
        res.json({ status: "Catch Error Access Denied"});
        console.log(error)
    }
});

module.exports = router;
