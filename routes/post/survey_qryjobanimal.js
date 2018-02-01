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
            var qryAnimal =  `
                            SELECT
                                   pja.animal1
                                ,   pja.animal2
                                ,   pja.animal3
                                ,   pja.animal4
                                ,   pja.animal5
                                ,   pja.animal6
                                ,   pja.animal7
                                ,   pja.animal8
                                ,   pja.animal9
                                ,   pja.animal_another
                            FROM
                                   population_works pw
                                ,   population_job_animal pja
                            WHERE
                                pw.works_id = '${works_id}'
                            AND
                                pw.works_id = pja.works_id
                            ORDER BY pw.works_id DESC;
                            `
            console.log(qryAnimal);
            con.query({sql: qryAnimal}, (error, result, fields) => {
                var chk = result[0]
                console.log(`job animal query record = '${JSON.stringify(chk)}'`);
                if (typeof chk != "undefined") {
                    res.json({ 
                        status: "ok"
                        ,   animal1: result[0]['animal1']
                        ,   animal2: result[0]['animal2']
                        ,   animal3: result[0]['animal3']
                        ,   animal4: result[0]['animal4']
                        ,   animal5: result[0]['animal5']
                        ,   animal6: result[0]['animal6']
                        ,   animal7: result[0]['animal7']
                        ,   animal8: result[0]['animal8']
                        ,   animal9: result[0]['animal9']
                        ,   animal_nother: result[0]['animal_another']
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
