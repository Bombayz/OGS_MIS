var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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
/* GET users listing. */
router.post('/', function (req, res, next) {
    try {
        if (req.body) {
            var qry =   `SELECT
                            DISTINCT(vilage_name),
                            vilage_id
                        FROM 
                            vilage
                        WHERE
                            ACTIVE = 'Y'
                        ORDER BY vilage_id DESC,vilage_name DESC,vilage_no DESC,survey_status DESC;
                        `
            console.log(qry);
            //SELECT
            resp = {}
            vilageNameData = [];
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result
                console.log("re = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    for(i = 0;i<result.length;i++){
                        vilageNameData.push(result[i])
                    }
                    resp.vilageNameData = vilageNameData
                    resp.status = "ok"
                    res.json(resp);
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
