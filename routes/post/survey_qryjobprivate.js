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
            var qryPrivate =  `
                            SELECT
                                   pjp.private1
                                ,   pjp.private2
                                ,   pjp.private3
                                ,   pjp.private4
                                ,   pjp.private5
                                ,   pjp.private6
                                ,   pjp.private7
                                ,   pjp.private_another
                            FROM
                                   population_works pw
                                ,   population_job_private pjp
                            WHERE
                                pw.works_id = '${works_id}'
                            AND
                                pw.works_id = pjp.works_id
                            ORDER BY pw.works_id DESC;
                            `
            console.log(qryPrivate);
            con.query({sql: qryPrivate}, (error, result, fields) => {
                var chk = result[0]
                console.log(`job private query record = '${JSON.stringify(chk)}'`);
                if (typeof chk != "undefined") {
                    res.json({ 
                        status: "ok"
                        ,   private1: result[0]['private1']
                        ,   private2: result[0]['private2']
                        ,   private3: result[0]['private3']
                        ,   private4: result[0]['private4']
                        ,   private5: result[0]['private5']
                        ,   private6: result[0]['private6']
                        ,   private7: result[0]['private7']
                        ,   private_another: result[0]['private_another']
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
