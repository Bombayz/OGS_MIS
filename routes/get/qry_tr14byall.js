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
router.get('/', function (req, res, next) {
    let search_house_no = req.params.house_no

    if(search_house_no == " "){
        search_house_no = ""
    }
    try {
        if (req.body) {
            var qry =   `
                        SELECT
                        *
                        FROM
                            tr14
                        ORDER BY tr14_running DESC;
                        `
            console.log(qry);
            //SELECT
            resp = {}
            data = [];
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result
                console.log("result = " + JSON.stringify(chk));
                if (chk.length != 0) {
                    for(i = 0;i<result.length;i++){
                        data.push(result[i])
                    }
                    resp.data = data
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
