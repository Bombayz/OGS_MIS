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
    var house_id = json.house_id;
    console.log(house_id);
    try {
        if (req.body) {
            var qryHouse =  `
                            SELECT
                                h.house_id
                                ,   h.house_no
                                ,   h.vilage_id
                                ,   h.house_holder
                                ,   h.house_location_lat
                                ,   h.house_location_lng
                                ,   h.house_in_registry
                                ,   h.house_status
                                ,   h.house_family_type
                                ,   h.distributor
                                ,   h.survey_status
                                ,   hd.disaster_type
                                ,   hd.dis1
                                ,   hd.dis2
                                ,   hd.dis3
                                ,   hd.dis4
                                ,   hd.dis5
                                ,   hd.dis6
                                ,   hd.dis7
                                ,   hd.dis8
                                ,   hd.dis9
                                ,   hd.dis10
                                ,   hd.dis11
                                ,   hd.dis12
                                ,   hd.dis13
                                ,   hd.dis14
                                ,   he.envyprob_type
                                ,   he.ep1
                                ,   he.ep2
                                ,   he.ep3
                                ,   he.ep4
                                ,   he.ep5
                                ,   he.ep6
                                ,   he.ep7
                                ,   hp.prob1
                                ,   hp.prob2
                                ,   hp.prob3
                                ,   hp.prob4
                                ,   hp.prob5
                                ,   hp.prob6
                                ,   hp.prob7
                                ,   hp.prob8
                                ,   hp.prob9
                                ,   hp.prob10
                                ,   hp.problem_another
                                ,   IFNULL(DATE_FORMAT(h.upd_date,'%Y-%m-%d'),DATE_FORMAT(h.cr_date,'%Y-%m-%d')) savedate
                            FROM
                                house h
                                ,   house_disaster hd
                                ,   house_envyprob he
                                ,   house_problem hp
                            WHERE
                                h.house_id = hd.house_id
                            AND
                                h.house_id = he.house_id
                            AND
                                h.house_id = hp.house_id
                            AND
                                h.ACTIVE = 'Y'
                            AND
                                he.ACTIVE = 'Y'
                            AND
                                hp.ACTIVE = 'Y'
                            AND
                                hd.ACTIVE = 'Y'
                            AND
                                h.house_id = '${house_id}'
                            ORDER BY h.house_id DESC;
                            `
            console.log(qryHouse);
            con.query({sql: qryHouse}, (error, result, fields) => {
                var chk = result[0]
                console.log(`house query record = '${JSON.stringify(chk)}'`);
                if (typeof chk != "undefined") {
                    res.json({ 
                        status: "ok"
                        ,   house_id: result[0]['house_id']
                        ,   house_no: result[0]['house_no']
                        ,   vilage_id: result[0]['vilage_id']
                        ,   house_holder: result[0]['house_holder']
                        ,   house_location_lat: result[0]['house_location_lat']
                        ,   house_location_lng: result[0]['house_location_lng']
                        ,   house_in_registry: result[0]['house_in_registry']
                        ,   house_status: result[0]['house_status']
                        ,   house_family_type: result[0]['house_family_type']
                        ,   distributor: result[0]['distributor']
                        ,   survey_status: result[0]['survey_status']
                        ,   disaster_type: result[0]['disaster_type']
                        ,   dis1: result[0]['dis1']
                        ,   dis2: result[0]['dis2']
                        ,   dis3: result[0]['dis3']
                        ,   dis4: result[0]['dis4']
                        ,   dis5: result[0]['dis5']
                        ,   dis6: result[0]['dis6']
                        ,   dis7: result[0]['dis7']
                        ,   dis8: result[0]['dis8']
                        ,   dis9: result[0]['dis9']
                        ,   dis10: result[0]['dis10']
                        ,   dis11: result[0]['dis11']
                        ,   dis12: result[0]['dis12']
                        ,   dis13: result[0]['dis13']
                        ,   dis14: result[0]['dis14']
                        ,   envyprob_type: result[0]['envyprob_type']
                        ,   ep1: result[0]['ep1']
                        ,   ep2: result[0]['ep2']
                        ,   ep3: result[0]['ep3']
                        ,   ep4: result[0]['ep4']
                        ,   ep5: result[0]['ep5']
                        ,   ep6: result[0]['ep6']
                        ,   ep7: result[0]['ep7']
                        ,   prob1: result[0]['prob1']
                        ,   prob2: result[0]['prob2']
                        ,   prob3: result[0]['prob3']
                        ,   prob4: result[0]['prob4']
                        ,   prob5: result[0]['prob5']
                        ,   prob6: result[0]['prob6']
                        ,   prob7: result[0]['prob7']
                        ,   prob8: result[0]['prob8']
                        ,   prob9: result[0]['prob9']
                        ,   prob10: result[0]['prob10']
                        ,   problem_another: result[0]['problem_another']
                        ,   savedate: result[0]['savedate']
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
