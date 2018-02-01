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

    let system_id = json.system_id
    let dimen1 = json.dimen1
    let dimen2 = json.dimen2
    let dimen3 = json.dimen3
    let land_benefit = json.land_benefit
    let land_location = json.land_location
    let land_tax = json.land_tax
    let land_rent = json.land_rent
    let distributor = json.distributor

    let land_running = json.land_running
    try {
        if (req.body) {
            var upd = 
                    `
                    UPDATE population_asset_land
                    SET               
                            system_id = '${system_id}'
                        ,   dimen1 = '${dimen1}'
                        ,   dimen2 = '${dimen2}'
                        ,   dimen3 = '${dimen3}'
                        ,   land_benefit = '${land_benefit}'
                        ,   land_location = '${land_location}'
                        ,   land_tax = '${land_tax}'
                        ,   land_rent = '${land_rent}'
                        ,   distributor = '${distributor}'
                        ,   cr_by = '${username}'
                        ,   cr_date = NOW()
                        ,   ACTIVE = 'Y'
                    WHERE land_running = '${land_running}'
                    `
            console.log(upd)
            con.query({sql:upd},(err, result) => {
                if (err) throw err;
                console.log("population_asset_land table " + result.affectedRows + " record(s) updated");
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
