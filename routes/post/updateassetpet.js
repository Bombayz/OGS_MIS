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

    let pet_regis = json.pet_regis
    let pet_amount = json.pet_amount
    let prophylaxis = json.prophylaxis
    let ptype_id = json.ptypet_id
    let pet_sex = json.pet_sex
    let vaccine = json.vaccine
    let vaccine_during = json.vaccine_during
    let vaccine_lastest = json.vaccine_lastest
    let pet_newborn = json.pet_newborn
    let pet_newborn_number = json.pet_newborn_number
    let distributor = json.distributor

    let pet_running = json.pet_running
    try {
        if (req.body) {
            var upd = 
                    `
                    UPDATE population_asset_pet
                    SET               
                            pet_regis = '${pet_regis}'
                        ,   pet_amount = '${pet_amount}'
                        ,   prophylaxis = '${prophylaxis}'
                        ,   ptype_id = '${ptype_id}'
                        ,   pet_sex = '${pet_sex}'
                        ,   vaccine = '${vaccine}'
                        ,   vaccine_during = '${vaccine_during}'
                        ,   vaccine_lastest = '${vaccine_lastest}'
                        ,   pet_newborn = '${pet_newborn}'
                        ,   pet_newborn_number = '${pet_newborn_number}'
                        ,   distributor = '${distributor}'
                        ,   cr_by = '${username}'
                        ,   cr_date = NOW()
                        ,   ACTIVE = 'Y'
                    WHERE pet_running = '${pet_running}'
                    `
            console.log(upd)
            con.query({sql:upd},(err, result) => {
                if (err) throw err;
                console.log("population_asset_pet table " + result.affectedRows + " record(s) updated");
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
