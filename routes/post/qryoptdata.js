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
    try {
        if (req.body) {
            var qryOpt =   `SELECT * From opt WHERE ACTIVE = 'Y'`
            console.log(qryOpt);
            //SELECT
            con.query({sql: qryOpt}, (error, result, fields) => {
                var chk = result[0]
                console.log("query record = " + JSON.stringify(chk));
                 if (typeof chk != "undefined") {
                     res.json({
                            status: "ok"
                            ,   opt_id: result[0]['opt_id']
                            ,   opt_name:result[0]['opt_name']
                            ,   opt_type_id: result[0]['opt_type_id']
                            ,   opt_location_lat:result[0]['opt_location_lat']
                            ,   opt_location_lng:result[0]['opt_location_lng']
                            ,   opt_address_no:result[0]['opt_address_no']
                            ,   opt_vilage_no:result[0]['opt_vilage_no']
                            ,   opt_alley:result[0]['opt_alley']
                            ,   opt_road:result[0]['opt_road']
                            ,   opt_province:result[0]['opt_province']
                            ,   opt_district:result[0]['opt_district']
                            ,   opt_sub_district:result[0]['opt_sub_district']
                            ,   opt_postal_code:result[0]['opt_postal_code']
                            ,   opt_tel:result[0]['opt_tel']
                            ,   opt_fax:result[0]['opt_fax']
                            ,   opt_vision:result[0]['opt_vision']
                        });
                } else {
                    res.json({ status: "deny" });
                }
                console.log(error);
            });
        } else {
            res.json({
                "status": "deny"
            })
        }
    } catch (error) {
        res.json({ status: "deny" });
    }
});

module.exports = router;
