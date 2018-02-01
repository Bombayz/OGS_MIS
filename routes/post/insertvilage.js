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

    let vilage_name = json.vilage_name
    let vilage_location_lat = json.vilage_location_lat
    let vilage_location_lng = json.vilage_location_lng
    let vilage_aor = json.vilage_aor
    let vilage_liveable = json.vilage_liveable
    let vilage_start = json.vilage_start
    let vilage_history = json.vilage_history
    let vilage_problem = json.vilage_problem
    let vilage_sup_firstname = json.vilage_sup_firstname
    let vilage_sup_lastname = json.vilage_sup_lastname
    let vilage_sup_startdate = json.vilage_sup_startdate
    let vilage_address_no = json.vilage_address_no
    let vilage_no = json.vilage_no
    let vilage_alley = json.vilage_alley
    let vilage_road = json.vilage_road
    let vilage_province = json.vilage_province
    let vilage_district = json.vilage_district
    let vilage_sub_district = json.vilage_sub_district
    let vilage_postal_code = json.vilage_postal_code
    let vilage_tel = json.vilage_tel
    let vilage_img = json.vilage_img
    let vilage_informant_firstname = json.vilage_informant_firstname
    let vilage_informant_lastname = json.vilage_informant_lastname
    let vilage_informant_tel = json.vilage_informant_tel
    let slum_status = json.slum_status
    let slum_address = json.slum_address

    let area_river = json.area_river
    let area_plateau = json.area_plateau
    let area_mountain = json.area_mountain
    let area_coastal = json.area_coastal

    let soil_bog = json.soil_bog
    let soil_don = json.soil_don
    let soil_clay = json.soil_clay
    let soil_mold = json.soil_mold
    let soil_sandy = json.soil_sandy
    try {
        if (req.body) {

            var OptQryAll = `SELECT opt_id FROM opt ORDER BY opt_id desc LIMIT 1;`
            console.log(OptQryAll)
            //SELECT
            con.query({sql: OptQryAll}, (error, result, fields) => {
                var OptChk = result[0]
                console.log("query record = " + JSON.stringify(OptChk));
                if (typeof OptChk != "undefined") {
                    //INSERT VILAGE TABLE
                    var insQry = 
                    `
                    INSERT INTO vilage
                        (
                            opt_id
                            ,   vilage_name
                            ,   vilage_location_lat
                            ,   vilage_location_lng
                            ,   vilage_aor
                            ,   vilage_liveable
                            ,   vilage_start
                            ,   vilage_history
                            ,   vilage_problem
                            ,   vilage_sup_firstname
                            ,   vilage_sup_lastname
                            ,   vilage_sup_startdate
                            ,   vilage_address_no
                            ,   vilage_no
                            ,   vilage_alley
                            ,   vilage_road
                            ,   vilage_province
                            ,   vilage_district
                            ,   vilage_sub_district
                            ,   vilage_postal_code
                            ,   vilage_tel
                            ,   vilage_img
                            ,   vilage_informant_firstname
                            ,   vilage_informant_lastname
                            ,   vilage_informant_tel
                            ,   survey_status
                            ,   cr_by
                            ,   cr_date
                            ,   ACTIVE
                        )
                    VALUES
                        (
                            "${result[0]['opt_id']}"
                            ,   "${vilage_name}"
                            ,   "${vilage_location_lat}"
                            ,   "${vilage_location_lng}"
                            ,   "${vilage_aor}"
                            ,   "${vilage_liveable}"
                            ,   "${vilage_start}"
                            ,   "${vilage_history}"
                            ,   "${vilage_problem}"
                            ,   "${vilage_sup_firstname}"
                            ,   "${vilage_sup_lastname}"
                            ,   "${vilage_sup_startdate}"
                            ,   "${vilage_address_no}"
                            ,   "${vilage_no}"
                            ,   "${vilage_alley}"
                            ,   "${vilage_road}"
                            ,   "${vilage_province}"
                            ,   "${vilage_district}"
                            ,   "${vilage_sub_district}"
                            ,   "${vilage_postal_code}"
                            ,   "${vilage_tel}"
                            ,   "${vilage_img}"
                            ,   "${vilage_informant_firstname}"
                            ,   "${vilage_informant_lastname}"
                            ,   "${vilage_informant_tel}"
                            ,   "0"
                            ,   "${username}"
                            ,   NOW()
                            ,   "Y"
                        );
                    `
                    console.log(insQry)
                    con.query({sql:insQry},(err, result) => {
                        if (err) throw err;
                        console.log("Vilage table 1 record inserted");
                    });

                    var VilageQryAll = `SELECT vilage_id FROM vilage ORDER BY vilage_id desc LIMIT 1;`
                    console.log(VilageQryAll)
                    //SELECT
                    con.query({sql: VilageQryAll}, (error, result, fields) => {
                        var VilageChk = result[0]
                        console.log("query record = " + JSON.stringify(VilageChk));
                        if (typeof VilageChk != "undefined") {
                            //INSERT VILAGE SLUM TABLE
                            var insQryVS = 
                            `
                            INSERT INTO vilage_slum    
                                (
                                    slum_status
                                    ,   slum_address
                                    ,   vilage_id
                                    ,   cr_by
                                    ,   cr_date
                                    ,   ACTIVE
                                )
                            VALUES
                                (
                                    "${slum_status}"
                                    ,   "${slum_address}"
                                    ,   "${result[0]['vilage_id']}"
                                    ,   "${username}"
                                    ,   NOW()
                                    ,   "Y"
                                );
                                `
                            console.log(insQryVS)
                            con.query({sql:insQryVS},(err, result) => {
                                if (err) throw err;
                                console.log("Vilage slum table 1 record inserted");
                            });

                            //INSERT VILAGE AREA TABLE
                            var insQryVA = 
                            `
                            INSERT INTO vilage_area    
                                (
                                    area_river
                                    ,   area_plateau
                                    ,   area_mountain
                                    ,   area_coastal
                                    ,   vilage_id
                                    ,   cr_by
                                    ,   cr_date
                                    ,   ACTIVE
                                )
                            VALUES
                                (
                                    "${area_river}"
                                    ,   "${area_plateau}"
                                    ,   "${area_mountain}"
                                    ,   "${area_coastal}"
                                    ,   "${result[0]['vilage_id']}"
                                    ,   "${username}"
                                    ,   NOW()
                                    ,   "Y"
                                );
                            `
                            console.log(insQryVA)
                            con.query({sql:insQryVA},(err, result) => {
                                if (err) throw err;
                                console.log("Vilage area table 1 record inserted");
                            });

                            //INSERT VILAGE SOIL TABLE
                            var insQryVSoil = 
                            `
                            INSERT INTO vilage_soil   
                                (
                                    soil_bog
                                    ,   soil_don
                                    ,   soil_clay
                                    ,   soil_mold
                                    ,   soil_sandy
                                    ,   vilage_id
                                    ,   cr_by
                                    ,   cr_date
                                    ,   ACTIVE
                                )
                            VALUES
                                (
                                    "${soil_bog}"
                                    ,   "${soil_don}"
                                    ,   "${soil_clay}"
                                    ,   "${soil_mold}"
                                    ,   "${soil_sandy}"
                                    ,   "${result[0]['vilage_id']}"
                                    ,   "${username}"
                                    ,   NOW()
                                    ,   "Y"
                                );
                            `
                            console.log(insQryVSoil)
                            con.query({sql:insQryVSoil},(err, result) => {
                                if (err) throw err;
                                console.log("Vilage soil table 1 record inserted");
                                res.json({ status: "ok" });
                            });
                        }else{
                            res.json({ status: "deny" });
                        }
                        console.log(error);
                    });
                    

                } else {
                    res.json({ status: "deny" });
                }
                console.log(error);
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
