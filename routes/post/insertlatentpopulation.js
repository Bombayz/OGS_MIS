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


    var {house_id,house_no,vilage_no,idcard,firstname,lastname,prename,sex,birthdate,nationality} = json
    try {
        if (req.body) {

            var ins = 
                    `
                    INSERT INTO latentpopulation
                    (
                        house_id
                        ,   house_no
                        ,   vilage_no
                        ,   idcard
                        ,   firstname
                        ,   lastname
                        ,   prename
                        ,   sex
                        ,   birthdate
                        ,   nationality
                    )
                    VALUES
                    (
                        "${house_id}"
                        ,   "${house_no}"
                        ,   "${vilage_no}"
                        ,   "${idcard}"
                        ,   "${firstname}"
                        ,   "${lastname}"
                        ,   "${prename}"
                        ,   "${sex}"
                        ,   "${birthdate}"
                        ,   "${nationality}"
                    )
                    `
            console.log(ins)
            con.query({sql:ins},(err, result) => {
                if (err) throw err;
                console.log("latentpopulation table 1 record inserted");
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
