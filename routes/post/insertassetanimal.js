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
    let animal_regis = json.animal_regis
    let animal_amount = json.animal_amount
    let atype_name = json.atype_name
    let infection = json.infection
    let infection_detail = json.infection_detail
    let shelter = json.shelter
    let diseasecontrol = json.diseasecontrol
    let diseasecontrol_by = json.diseasecontrol_by
    let disease_shelter = json.disease_shelter
    let market = json.market
    let market_place = json.market_place
    let distributor = json.distributor
    try {
        if (req.body) {
            var ins = 
                    `
                    INSERT INTO population_asset_animal
                        (
                            population_idcard
                            ,   animal_regis
                            ,   animal_amount
                            ,   atype_name
                            ,   infection
                            ,   infection_detail
                            ,   shelter
                            ,   diseasecontrol
                            ,   diseasecontrol_by
                            ,   disease_shelter
                            ,   market
                            ,   market_place
                            ,   distributor
                            ,   cr_by
                            ,   cr_date
                            ,   ACTIVE
                        )
                    VALUES
                        (
                            "${population_idcard}"
                            ,   "${animal_regis}"
                            ,   "${animal_amount}"
                            ,   "${atype_name}"
                            ,   "${infection}"
                            ,   "${infection_detail}"
                            ,   "${shelter}"
                            ,   "${diseasecontrol}"
                            ,   "${diseasecontrol_by}"
                            ,   "${disease_shelter}"
                            ,   "${market}"
                            ,   "${market_place}"
                            ,   "${distributor}"
                            ,   "${username}"
                            ,   NOW()
                            ,   "Y"
                        );
                    `
            console.log(ins)
            con.query({sql:ins},(err, result) => {
                if (err) throw err;
                console.log("population_asset_animal table 1 record inserted");
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
