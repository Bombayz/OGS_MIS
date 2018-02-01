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

    let regisdate = json.regisdate
    let vtype_id = json.vtype_id
    let vehicle_rent = json.vehicle_rent
    let distributor = json.distributor

    let vehicle_running = json.vehicle_running
    try {
        if (req.body) {
            var upd = 
                    `
                    UPDATE population_asset_vehicle
                    SET               
                            regisdate = '${regisdate}'
                        ,   vtype_id = '${vtype_id}'
                        ,   vehicle_rent = '${vehicle_rent}'
                        ,   distributor = '${distributor}'
                        ,   cr_by = '${username}'
                        ,   cr_date = NOW()
                        ,   ACTIVE = 'Y'
                    WHERE vehicle_running = '${vehicle_running}'
                    `
            console.log(upd)
            con.query({sql:upd},(err, result) => {
                if (err) throw err;
                console.log("population_asset_vehicle table " + result.affectedRows + " record(s) updated");
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
