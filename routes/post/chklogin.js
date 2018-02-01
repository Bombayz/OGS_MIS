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
/* POST users listing. */
router.post('/', function (req, res, next) {

    var json = req.body;
    try {
        if (req.body) {
            var qry =   `SELECT 
                                members_id
                            ,   members_un
                            ,   members_status

                        FROM
                                members m

                        WHERE (members_un = '${json.username}' AND members_pw = '${json.password}')
                        `
            console.log(qry);
            

            
            //SELECT
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result[0]
                console.log("re = " + JSON.stringify(chk));
                 if (typeof chk != "undefined") {
                     res.json({ status: "ok", username: result[0]['members_un'], userstatus:result[0]['members_status'], userid: result[0]['members_id']});
                 } else {
                     res.json({ status: "deny" });
                 }
                 console.log(error);
            });
        } else {
            res.json({
                "status": "denysss"
            })
        }
    } catch (error) {
        res.json({ status: "deny" });
    }
});

module.exports = router;
