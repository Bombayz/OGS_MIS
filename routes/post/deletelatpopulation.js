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

    //value
    var population_idcard = json.population_idcard
    var residence_status = json.residence_status

    //username password
    let userid = json.userid
    let username = json.username

    try {
        if (req.body) {

            var qryAll = `
                        SELECT 
                                pw.works_id
                            ,   p.population_idcard
                            ,   p.residence_status
                            ,   p.population_running
                        FROM 
                                population p
                            ,   population_works pw
                        WHERE
                            p.ACTIVE = 'Y'
                        AND
                            pw.ACTIVE = 'Y'
                        AND
                            p.population_idcard = '${population_idcard}'
                        AND
                            p.residence_status = '${residence_status}'
                        AND
                            p.population_running = pw.population_running
                        AND
                            p.residence_status = '0'
                        ORDER BY p.population_running,p.population_idcard,pw.works_id DESC;
                        `
            console.log(qryAll)
            con.query({sql: qryAll}, (error, result, fields) => {
                var chk = result[0]
                console.log("query record = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    //population
                    var delPopulation = 
                    `
                    DELETE FROM population
                    WHERE population_running = "${result[0]['population_running']}"
                    `
                    console.log(delPopulation)
                    con.query({sql:delPopulation}, function (err, result) {
                        if (err) throw err;
                        console.log("population table " + result.affectedRows + " record(s) deleted");
                    });

                    //population_congenitalhis
                    var delPopulation_congenitalhis = 
                    `
                    DELETE FROM population_congenitalhis
                    WHERE population_running = "${result[0]['population_running']}"
                    `
                    console.log(delPopulation_congenitalhis)
                    con.query({sql:delPopulation_congenitalhis}, function (err, result) {
                        if (err) throw err;
                        console.log("population_congenitalhis table " + result.affectedRows + " record(s) deleted");
                    });

                    //population_contagioushis
                    var delPopulation_contagioushis = 
                    `
                    DELETE FROM population_contagioushis
                    WHERE population_running = "${result[0]['population_running']}"
                    `
                    console.log(delPopulation_contagioushis)
                    con.query({sql:delPopulation_contagioushis}, function (err, result) {
                        if (err) throw err;
                        console.log("population_contagioushis table " + result.affectedRows + " record(s) deleted");
                    });

                    //population_disabled
                    var delPopulation_disabled = 
                    `
                    DELETE FROM population_disabled
                    WHERE population_running = "${result[0]['population_running']}"
                    `
                    console.log(delPopulation_disabled)
                    con.query({sql:delPopulation_disabled}, function (err, result) {
                        if (err) throw err;
                        console.log("population_disabled table " + result.affectedRows + " record(s) deleted");
                    });

                    //population_transport
                    var delPopulation_transport = 
                    `
                    DELETE FROM population_transport
                    WHERE population_idcard = "${result[0]['population_idcard']}"
                    `
                    console.log(delPopulation_transport)
                    con.query({sql:delPopulation_transport}, function (err, result) {
                        if (err) throw err;
                        console.log("population_transport table " + result.affectedRows + " record(s) deleted");
                    });


                    //population_works
                    var delPopulation_works = 
                    `
                    DELETE FROM population_works
                    WHERE population_running = "${result[0]['population_running']}"
                    `
                    console.log(delPopulation_works)
                    con.query({sql:delPopulation_works}, function (err, result) {
                        if (err) throw err;
                        console.log("population_works table " + result.affectedRows + " record(s) deleted");
                    });

                    //population_job_agriculture
                    var delPopulation_job_agriculture = 
                    `
                    DELETE FROM population_job_agriculture
                    WHERE works_id = "${result[0]['works_id']}"
                    `
                    console.log(delPopulation_job_agriculture)
                    con.query({sql:delPopulation_job_agriculture}, function (err, result) {
                        if (err) throw err;
                        console.log("population_job_agriculture table " + result.affectedRows + " record(s) deleted");
                    });

                    //population_job_animal
                    var delPopulation_job_animal = 
                    `
                    DELETE FROM population_job_animal
                    WHERE works_id = "${result[0]['works_id']}"
                    `
                    console.log(delPopulation_job_animal)
                    con.query({sql:delPopulation_job_animal}, function (err, result) {
                        if (err) throw err;
                        console.log("population_job_animal table " + result.affectedRows + " record(s) deleted");
                    });

                    //population_job_govern
                    var delPopulation_job_govern = 
                    `
                    DELETE FROM population_job_govern
                    WHERE works_id = "${result[0]['works_id']}"
                    `
                    console.log(delPopulation_job_govern)
                    con.query({sql:delPopulation_job_govern}, function (err, result) {
                        if (err) throw err;
                        console.log("population_job_govern table " + result.affectedRows + " record(s) deleted");
                    });

                    //population_job_private
                    var delPopulation_job_private = 
                    `
                    DELETE FROM population_job_private
                    WHERE works_id = "${result[0]['works_id']}"
                    `
                    console.log(delPopulation_job_private)
                    con.query({sql:delPopulation_job_private}, function (err, result) {
                        if (err) throw err;
                        console.log("population_job_private table " + result.affectedRows + " record(s) deleted");
                    });

                    //latentpopulation
                    var delLatentpopulation = 
                    `
                    DELETE FROM latentpopulation
                    WHERE idcard = "${result[0]['population_idcard']}"
                    `
                    console.log(delLatentpopulation)
                    con.query({sql:delLatentpopulation}, function (err, result) {
                        if (err) throw err;
                        res.json({
                            status: "ok"
                        })
                        console.log("latentpopulation table " + result.affectedRows + " record(s) deleted");
                    });

                } else {

                    //latentpopulation
                    var delLatentpopulation = 
                    `
                    DELETE FROM latentpopulation
                    WHERE idcard = "${population_idcard}"
                    `
                    console.log(delLatentpopulation)
                    con.query({sql:delLatentpopulation}, function (err, result) {
                        if (err) throw err;
                        res.json({
                            status: "ok"
                        })
                        console.log("latentpopulation table " + result.affectedRows + " record(s) deleted");
                    });
                }
            });
        } else {
            res.json({
                status: "Request Body Access Denied"
            })
        }
    } catch (error) {
        res.json({ 
            status: "Catch Error Access Denied" 
        });
    }
});

module.exports = router;
