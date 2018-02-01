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
router.post('/', function (req, res, next) {

    var json = req.body;
    var {works_id} = json
    try {
        if (req.body) {
            var qryGovern =  `
                            SELECT
                                pjg.govern1
                                ,   pjg.govern2
                                ,   pjg.govern3
                                ,   pjg.govern4
                                ,   pjg.govern5
                                ,   pjg.govern_another
                            FROM
                                   population_works pw
                                ,   population_job_govern pjg
                            WHERE
                                pw.works_id = '${works_id}'
                            AND
                                pw.works_id = pjg.works_id
                            ORDER BY pw.works_id DESC;
                            `
            console.log(qryGovern);
            con.query({sql: qryGovern}, (error, result, fields) => {
                var chk = result[0]
                console.log(`job govern query record = '${JSON.stringify(chk)}'`);
                if (typeof chk != "undefined") {
                    res.json({ 
                        status: "ok"
                        ,   govern1: result[0]['govern1']
                        ,   govern2: result[0]['govern2']
                        ,   govern3: result[0]['govern3']
                        ,   govern4: result[0]['govern4']
                        ,   govern5: result[0]['govern5']
                        ,   govern_another: result[0]['govern_another']
                    });
                } else {
                    res.json({ status: "deny" });
                }
                console.log(error);
            });
        } else {
            res.json({
                status: "deny"
            })
        }
    } catch (error) {
        res.json({ status: "deny" });
    }
});

module.exports = router;
