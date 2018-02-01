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
    var param_house_id = json.house_id;
    console.log(param_house_id);
    try {
        if (req.body) {
            var qryHouse =  `
                            SELECT
                                v.vilage_no,
                                v.vilage_name,
                                h.house_no,
                                h.house_id,
                                h.house_holder
                            FROM
                                vilage v,
                                house h
                            WHERE
                                h.house_id = ${param_house_id}
                            AND
                                v.vilage_id = h.vilage_id
                            AND
                                v.ACTIVE = 'Y'
                            AND
                                h.ACTIVE = 'Y'
                            ORDER BY v.vilage_id,h.house_no,h.house_id DESC
                            LIMIT 1;
                            `
            console.log(qryHouse);
            //SELECT
            con.query({sql: qryHouse}, (error, result, fields) => {
                var chk = result[0]
                console.log(`query record = '${JSON.stringify(chk)}'`);
                 if (typeof chk != "undefined") {
                    if(result[0]['house_holder'] != '0'){
                        var qryPopulation = `
                            SELECT 
                                population_idcard,
                                pn.prename_id,
                                pn.prename_detail,
                                p.firstname,
                                p.lastname,
                                DATE_FORMAT(p.birthdate,'%Y-%m-%d') AS birthdate,
                                n.nationality_id,
                                n.nationality_detail
                            FROM
                                population p,
                                prename pn,
                                nationality n
                            WHERE
                                dwellerstatus = '0'
                            AND
                                p.house_id = ${result[0]['house_id']}
                            AND
                                p.ACTIVE = 'Y'
                            AND
                                pn.ACTIVE = 'Y'
                            AND
                                n.ACTIVE = 'Y'
                            AND
                                p.prename_id = pn.prename_id
                            AND
                                p.nationality_id = n.nationality_id
                            LIMIT 1;
                        `
                        con.query({},() => {})
                        con.query({sql: qryPopulation}, (sub_error, sub_result, sub_fields) => {
                            var subchk = sub_result[0]
                            console.log("query record = " + JSON.stringify(subchk));
                            if (typeof chk != "undefined") {
                                res.json({
                                    status: "ok"
                                    ,   vilage_no: result[0]['vilage_no']
                                    ,   vilage_name:result[0]['vilage_name']
                                    ,   house_no: result[0]['house_no']
                                    ,   house_id:result[0]['house_id']
                                    ,   house_holder:result[0]['house_holder']
                                    ,   population_idcard:sub_result[0]['population_idcard']
                                    ,   prename_id:sub_result[0]['prename_id']
                                    ,   prename_detail:sub_result[0]['prename_detail']
                                    ,   firstname:sub_result[0]['firstname']
                                    ,   lastname:sub_result[0]['lastname']
                                    ,   birthdate:sub_result[0]['birthdate']
                                    ,   nationality_id:sub_result[0]['nationality_id']
                                    ,   nationality_detail:sub_result[0]['nationality_detail']
                                });
                            } else {
                                res.json({ status: "deny" });
                            }
                            console.log(sub_error);
                        });
                    }else{
                        res.json({
                            status: "ok"
                            ,   vilage_no: result[0]['vilage_no']
                            ,   vilage_name:result[0]['vilage_name']
                            ,   house_no: result[0]['house_no']
                            ,   house_id:result[0]['house_id']
                            ,   house_holder:result[0]['house_holder']
                            ,   population_idcard:''
                            ,   prename_id:''
                            ,   prename_detail:''
                            ,   firstname:''
                            ,   lastname:''
                            ,   birthdate:''
                            ,   nationality_id:''
                            ,   nationality_detail: ''
                        });
                    }
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
