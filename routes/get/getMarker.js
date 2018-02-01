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

    try {

        var qry = `
        SELECT distinct mis_test.tr14.house_no,
        mis_test.tr14.house_id,
        mis_test.tr14_position.lat,
        mis_test.tr14_position.lng,
        mis_test.tr14_position.image 
        FROM mis_test.tr14_position
        INNER JOIN mis_test.tr14 
        ON mis_test.tr14_position.house_id = mis_test.tr14.house_id ;
        `

        console.log(qry);

        //SELECT
        resp = {}
        data = [];
        con.query({
            sql: qry
        }, (error, result, fields) => {
            var chk = result

            if (chk.length != 0) {
                for (i = 0; i < result.length; i++) {

                    var raw = result[i]
                    var person = []

                    // qryHouseno = `     SELECT distinct mis_test.tr14.dweller,
                    // mis_test.tr14.firstname,     mis_test.tr14.lastname     FROM
                    // mis_test.tr14_position     INNER JOIN mis_test.tr14     ON
                    // mis_test.tr14_position.house_id = mis_test.tr14.house_id     WHERE
                    // mis_test.tr14.house_no = "${result[i]['house_no']}" ` con.query({     sql:
                    // qryHouseno },function (er, re, fi) {     for (i = 0; i < re.length; i++) {
                    // person.push(re[i])     }     raw.person = person     // console.log(person)
                    // })

                    data.push(raw)
                }
                resp.data = data
                // resp.status = "ok" res.json(resp);
            } else {
                res.json({status: "deny"});
            }

            resp.status = "ok"
            res.json(resp);
            console.log(error);
        });

    } catch (error) {
        res.json({status: "deny"});
    }
});

router.get('/populate/:id', function (req, res, next) {

    let id = req.params.id

    console.log(id)

    // if (id.indexOf('_') != -1) {
    //     id = id.replace('_', '/')
    // }

    // console.log("new id " + id)

    try {

        var qry = `
                    SELECT distinct mis_test.tr14.dweller, mis_test.tr14.firstname, mis_test.tr14.lastname     
                    FROM mis_test.tr14_position     
                    INNER JOIN mis_test.tr14     
                    ON mis_test.tr14_position.house_id = mis_test.tr14.house_id    
                    WHERE mis_test.tr14.house_id = "${id}" 
            `

        console.log(qry);

        //SELECT
        resp = {}
        data = [];
        con.query({
            sql: qry
        }, (error, result, fields) => {
            var chk = result

            if (chk.length != 0) {
                for (i = 0; i < result.length; i++) {

                    var raw = result[i]

                    data.push(raw)
                }
                resp.data = data

            } else {
                res.json({status: "deny"});
            }

            resp.status = "ok"
            res.json(resp);
            console.log(error);
        });

    } catch (error) {
        res.json({status: "deny"});
    }
});

// function searchHouse(result){     for (i = 0; i < result.data.length; i++) {
//    // console.log(resp.data[i].person) resp.data[i].person = "Bay"  person =
// []         qryHouseno = `                 SELECT distinct
// mis_test.tr14.dweller,                 mis_test.tr14.firstname,
// mis_test.tr14.lastname                 FROM mis_test.tr14_position INNER JOIN
// mis_test.tr14                 ON mis_test.tr14_position.house_id =
// mis_test.tr14.house_id WHERE mis_test.tr14.house_no = "${result.data[i]}" `
// con.query({             sql: qryHouseno         }, function (er, re, fi) {
//      for (i = 0; i < re.length; i++) { person.push(re[i])   }
// result.data[i].person = person console.log("BB")         })   } }

module.exports = router;
