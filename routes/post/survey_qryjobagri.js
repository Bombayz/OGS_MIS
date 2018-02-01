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
            var qryAgri =  `
                            SELECT
                                   pjag.agri1
                                ,   pjag.agri2
                                ,   pjag.agri3
                                ,   pjag.agri4
                                ,   pjag.agri5
                                ,   pjag.agri6
                                ,   pjag.agri7
                                ,   pjag.agri8
                                ,   pjag.agri_another
                            FROM
                                   population_works pw
                                ,   population_job_agriculture pjag
                            WHERE
                                pw.works_id = '${works_id}'
                            AND
                                pw.works_id = pjag.works_id
                            ORDER BY pw.works_id DESC;
                            `
            console.log(qryAgri);
            con.query({sql: qryAgri}, (error, result, fields) => {
                var chk = result[0]
                console.log(`job agri record = '${JSON.stringify(chk)}'`);
                if (typeof chk != "undefined") {
                    res.json({ 
                        status: "ok"
                        ,   agri1: result[0]['agri1']
                        ,   agri2: result[0]['agri2']
                        ,   agri3: result[0]['agri3']
                        ,   agri4: result[0]['agri4']
                        ,   agri5: result[0]['agri5']
                        ,   agri6: result[0]['agri6']
                        ,   agri7: result[0]['agri7']
                        ,   agri8: result[0]['agri8']
                        ,   agri_another: result[0]['agri_another']
                                                
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
