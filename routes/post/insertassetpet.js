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
    let pet_regis = json.pet_regis
    let pet_amount = json.pet_amount
    let ptype_id = json.ptype_id
    let pet_sex = json.pet_sex
    let vaccine = json.vaccine
    let vaccine_during = json.vaccine_during
    let vaccine_lastest = json.vaccine_lastest
    let sterile = json.sterile
    let pet_newborn = json.pet_newborn
    let pet_newborn_number = json.pet_newborn_number
    let distributor = json.distributor
    try {
        if (req.body) {
            var ins = 
                    `
                    INSERT INTO population_asset_pet
                        (
                            population_idcard
                            ,   pet_regis
                            ,   pet_amount
                            ,   ptype_id
                            ,   pet_sex
                            ,   vaccine
                            ,   vaccine_during
                            ,   vaccine_lastest
                            ,   sterile
                            ,   pet_newborn
                            ,   pet_newborn_number
                            ,   distributor
                            ,   cr_by
                            ,   cr_date
                            ,   ACTIVE
                        )
                    VALUES
                        (
                            "${population_idcard}"
                            ,   "${pet_regis}"
                            ,   "${pet_amount}"
                            ,   "${ptype_id}"
                            ,   "${pet_sex}"
                            ,   "${vaccine}"
                            ,   "${vaccine_during}"
                            ,   "${vaccine_lastest}"
                            ,   "${sterile}"
                            ,   "${pet_newborn}"
                            ,   "${pet_newborn_number}"
                            ,   "${distributor}"
                            ,   "${username}"
                            ,   NOW()
                            ,   "Y"
                        );
                    `
            console.log(ins)
            con.query({sql:ins},(err, result) => {
                if (err) throw err;
                console.log("population_asset_pet table 1 record inserted");
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
