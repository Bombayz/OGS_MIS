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

    let animal_regis = json.animal_regis
    let animal_amount = json.animal_amount
    let prophylaxis = json.prophylaxis
    let atype_id = json.atype_id
    let infection = json.infection
    let infection_detail = json.infection_detail
    let shelter = json.shelter
    let diseasecontrol = json.diseasecontrol
    let diseasecontrol_by = json.diseasecontrol_by
    let disease_shelter = json.disease_shelter
    let market = json.market
    let market_place = json.market_place
    let distributor = json.distributor

    let animal_running = json.animal_running
    try {
        if (req.body) {
            var upd = 
                    `
                    UPDATE population_asset_animal
                    SET               
                            animal_amount = '${animal_amount}'
                        ,   animal_amount = '${animal_amount}'
                        ,   prophylaxis = '${prophylaxis}'
                        ,   atype_id = '${atype_id}'
                        ,   infection = '${infection}'
                        ,   infection_detail = '${infection_detail}'
                        ,   shelter = '${shelter}'
                        ,   diseasecontrol = '${diseasecontrol}'
                        ,   diseasecontrol_by = '${diseasecontrol_by}'
                        ,   disease_shelter = '${disease_shelter}'
                        ,   market = '${market}'
                        ,   market_place = '${market_place}'
                        ,   distributor = '${distributor}'
                        ,   cr_by = '${username}'
                        ,   cr_date = NOW()
                        ,   ACTIVE = 'Y'
                    WHERE animal_running = '${animal_running}'
                    `
            console.log(upd)
            con.query({sql:upd},(err, result) => {
                if (err) throw err;
                console.log("population_asset_animal table " + result.affectedRows + " record(s) updated");
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
