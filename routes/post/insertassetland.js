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
    let system_id = json.system_id
    let dimen1 = json.dimen1
    let dimen2 = json.dimen2
    let dimen3 = json.dimen3
    let land_benefit = json.land_benefit
    let land_location = json.land_location
    let land_tax = json.land_tax
    let land_rent = json.land_rent
    let distributor = json.distributor
    try {
        if (req.body) {
            var ins = 
                    `
                    INSERT INTO population_asset_land
                        (
                            population_idcard
                            ,   system_id
                            ,   dimen1
                            ,   dimen2
                            ,   dimen3
                            ,   land_benefit
                            ,   land_location
                            ,   land_tax
                            ,   land_rent
                            ,   distributor
                            ,   cr_by
                            ,   cr_date
                            ,   ACTIVE
                        )
                    VALUES
                        (
                            "${population_idcard}"
                            ,   "${system_id}"
                            ,   "${dimen1}"
                            ,   "${dimen2}"
                            ,   "${dimen3}"
                            ,   "${land_benefit}"
                            ,   "${land_location}"
                            ,   "${land_tax}"
                            ,   "${land_rent}"
                            ,   "${distributor}"
                            ,   "${username}"
                            ,   NOW()
                            ,   "Y"
                        );
                    `
            console.log(ins)
            con.query({sql:ins},(err, result) => {
                if (err) throw err;
                console.log("population_asset_land table 1 record inserted");
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
        res.json({ status: "Catch Error Access Denied" });
    }
});

module.exports = router;
