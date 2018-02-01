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
    let animal_running = json.animal_running

    try {
        if (req.body) {
            var del = 
                    `
                    UPDATE population_asset_animal
                    SET
                        ACTIVE = 'N'
                    WHERE animal_running = '${animal_running}';
                    `
            console.log(del)
            con.query({sql:del},(err, result) => {
                if (err) throw err;
                console.log("population_asset_animal table " + result.affectedRows + " record(s) deleted");
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
