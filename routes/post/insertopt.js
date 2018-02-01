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
    let opt_id = json.opt_id
    let opt_name = json.opt_name
    let opt_type_id = json.opt_type_id
    let opt_location_lat = json.opt_location_lat
    let opt_location_lng = json.opt_location_lng
    let opt_address_no = json.opt_address_no
    let opt_vilage_no = json.opt_vilage_no
    let opt_alley = json.opt_alley
    let opt_road = json.opt_road
    let opt_province = json.opt_province
    let opt_district = json.opt_district
    let opt_sub_district = json.opt_sub_district
    let opt_postal_code = json.opt_postal_code
    let opt_tel = json.opt_tel
    let opt_fax = json.opt_fax
    let opt_vision = json.opt_vision
    let userid = json.userid
    let username = json.username
    try {
        if (req.body) {

            var qryAll = `SELECT opt_id FROM opt;`
            console.log(qryAll)
            //SELECT
            con.query({sql: qryAll}, (error, result, fields) => {
                var chk = result[0]
                console.log("query record = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    //UPDATE
                    var updQry = 
                    `
                    UPDATE opt
                    SET
                        opt_id = "${opt_id}"
                        ,   opt_name = "${opt_name}"
                        ,   opt_type_id = "${opt_type_id}"
                        ,   opt_location_lat = "${opt_location_lat}"
                        ,   opt_location_lng = "${opt_location_lng}"
                        ,   opt_address_no = "${opt_address_no}"
                        ,   opt_vilage_no = "${opt_vilage_no}"
                        ,   opt_alley = "${opt_alley}"
                        ,   opt_road = "${opt_road}"
                        ,   opt_province = "${opt_province}"
                        ,   opt_district = "${opt_district}"
                        ,   opt_sub_district = "${opt_sub_district}"
                        ,   opt_postal_code = "${opt_postal_code}"
                        ,   opt_tel = "${opt_tel}"
                        ,   opt_fax = "${opt_fax}"
                        ,   opt_vision = "${opt_vision}"
                        ,   upd_by = "${username}"
                        ,   upd_date = NOW()
                    WHERE opt_id = "${result[0]['opt_id']}"
                    `
                    console.log(updQry)
                    con.query({sql:updQry}, function (err, result) {
                        if (err) throw err;
                        console.log("OPT table " + result.affectedRows + " record(s) updated");
                    });

                    var updOptVilage = 
                    `
                    UPDATE vilage
                    SET
                        opt_id = "${opt_id}"
                    WHERE opt_id = "${result[0]['opt_id']}"
                    `
                    console.log(updOptVilage)
                    con.query({sql:updOptVilage}, function (err, result) {
                        if (err) throw err;
                        res.json({ status: "ok"});
                        console.log("Vilage table " + result.affectedRows + " record(s) updated");
                    }); 

                    
                } else {
                    //INSERT
                    var insQry = 
                    `
                    INSERT INTO opt
                        (
                            opt_id
                            ,   opt_name
                            ,   opt_type_id
                            ,   opt_location_lat
                            ,   opt_location_lng
                            ,   opt_address_no
                            ,   opt_vilage_no
                            ,   opt_alley
                            ,   opt_road
                            ,   opt_province
                            ,   opt_district
                            ,   opt_sub_district
                            ,   opt_postal_code
                            ,   opt_tel
                            ,   opt_fax
                            ,   opt_vision
                            ,   cr_by
                            ,   cr_date
                            ,   ACTIVE
                        )
                    VALUES
                        (
                            "${opt_id}"
                            ,   "${opt_name}"
                            ,   "${opt_type_id}"
                            ,   "${opt_location_lat}"
                            ,   "${opt_location_lng}"
                            ,   "${opt_address_no}"
                            ,   "${opt_vilage_no}"
                            ,   "${opt_alley}"
                            ,   "${opt_road}"
                            ,   "${opt_province}"
                            ,   "${opt_district}"
                            ,   "${opt_sub_district}"
                            ,   "${opt_postal_code}"
                            ,   "${opt_tel}"
                            ,   "${opt_fax}"
                            ,   "${opt_vision}"
                            ,   "${username}"
                            ,   NOW()
                            ,   "Y"
                        );
                    `
                    console.log(insQry)
                    con.query({sql:insQry},(err, result) => {
                        if (err) throw err;
                        res.json({ status: "ok" });
                        console.log("OPT table 1 record inserted");
                    });
                }
                console.log(error);
            });
        } else {
            res.json({
                "status": "Request Body Access Deny"
            })
        }
    } catch (error) {
        res.json({ status: "Catch Error Access Deny" });
    }
});

module.exports = router;
