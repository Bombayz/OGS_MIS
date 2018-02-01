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

    //main form
    var json = req.body;
    var house_id = json.house_id
    var house_no = json.house_no
    var vilage_id = json.vilage_id
    var house_holder = json.house_holder
    var house_location_lat = json.house_location_lat
    var house_location_lng = json.house_location_lng
    var house_in_registry = json.house_in_registry
    var house_status = json.house_status
    var house_family_type = json.house_family_type
    var distributor_img =  '1234'
    var distributor = json.distributor
    var survey_status = json.survey_status

    console.log(house_id);

    //username password
    let userid = json.userid
    let username = json.username


    //checkbox form
    var disaster_type = json.disaster_type
    var dis1 = json.dis1
    var dis2 = json.dis2
    var dis3 = json.dis3
    var dis4 = json.dis4
    var dis5 = json.dis5
    var dis6 = json.dis6
    var dis7 = json.dis7
    var dis8 = json.dis8
    var dis9 = json.dis9
    var dis10 = json.dis10
    var dis11 = json.dis11
    var dis12 = json.dis12
    var dis13 = json.dis13
    var dis14 = json.dis14

    var envyprob_type = json.envyprob_type
    var ep1 = json.ep1
    var ep2 = json.ep2
    var ep3 = json.ep3
    var ep4 = json.ep4
    var ep5 = json.ep5
    var ep6 = json.ep6
    var ep7 = json.ep7

    var envyprob_type = json.envyprob_type
    var prob1 = json.prob1
    var prob2 = json.prob2
    var prob3 = json.prob3
    var prob4 = json.prob4
    var prob5 = json.prob5
    var prob6 = json.prob6
    var prob7 = json.prob7
    var prob8 = json.prob8
    var prob9 = json.prob9
    var prob10 = json.prob10
    var problem_another = json.problem_another

    

    try {
        if (req.body) {

            //house
            var qryHouseId = `
                        SELECT 
                            house_id
                        FROM
                            house
                        WHERE
                            house_id = '${house_id}'
                        AND
                            ACTIVE = 'Y'
                        ORDER BY house_id DESC;
                        `
            console.log(qryHouseId)
            //select house
            con.query({sql: qryHouseId}, (error, result, fields) => {
                var chk = result[0]
                console.log("houseId query record = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    //update house
                    var updHouse = 
                    `
                    UPDATE house
                    SET
                            vilage_id = "${vilage_id}"
                        ,   house_holder = "${house_holder}"
                        ,   house_location_lat = "${house_location_lat}"
                        ,   house_location_lng = "${house_location_lng}"
                        ,   house_in_registry = "${house_in_registry}"
                        ,   house_status = "${house_status}"
                        ,   house_family_type = "${house_family_type}"
                        ,   distributor_img = "${distributor_img}"
                        ,   distributor = "${distributor}"
                        ,   survey_status = "${survey_status}"
                        ,   upd_by = "${username}"
                        ,   upd_date = NOW()
                        ,   ACTIVE = "Y"
                    WHERE house_id = "${result[0]['house_id']}"
                    `
                    console.log(updHouse)
                    con.query({sql:updHouse}, function (err, result) {
                        if (err) throw err;
                        console.log("house table " + result.affectedRows + " record(s) updated");
                    });
                } else {
                    //insert house
                    var insHouse = 
                    `
                    INSERT INTO house
                        (
                            house_id
                            ,   house_no
                            ,   vilage_id
                            ,   house_holder
                            ,   house_location_lat
                            ,   house_location_lng
                            ,   house_in_registry
                            ,   house_status
                            ,   house_family_type
                            ,   distributor_img
                            ,   distributor
                            ,   survey_status
                            ,   cr_by
                            ,   cr_date
                            ,   ACTIVE
                        )
                    VALUES
                        (
                            "${house_id}"
                            ,   "${house_no}"
                            ,   "${vilage_id}"
                            ,   "${house_holder}"
                            ,   "${house_location_lat}"
                            ,   "${house_location_lng}"
                            ,   "${house_in_registry}"
                            ,   "${house_status}"
                            ,   "${house_family_type}"
                            ,   "${distributor_img}"
                            ,   "${distributor}"
                            ,   "${survey_status}"
                            ,   "${username}"
                            ,   NOW()
                            ,   "Y"
                        );
                    `
                    console.log(insHouse)
                    con.query({sql:insHouse},(err, result) => {
                        if (err) throw err;
                        console.log("house table 1 record inserted");
                    });
                }
                console.log(error);
            });


            //house_disaster
            var qryDisaster = `
                                SELECT 
                                    house_id
                                FROM
                                    house_disaster
                                WHERE
                                    house_id = '${house_id}'
                                AND
                                    ACTIVE = 'Y'
                                ORDER BY house_id DESC;  
                                `
            console.log(qryDisaster)
            con.query({sql: qryDisaster}, (error, result, fields) => {
                var chk = result[0]
                console.log("disaster houseId query record = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    var updHouseDisaster = 
                                `
                                    UPDATE house_disaster
                                    SET
                                        disaster_type = "${disaster_type}"
                                    ,   dis1 = "${dis1}"
                                    ,   dis2 = "${dis2}"
                                    ,   dis3 = "${dis3}"
                                    ,   dis4 = "${dis4}"
                                    ,   dis5 = "${dis5}"
                                    ,   dis6 = "${dis6}"
                                    ,   dis7 = "${dis7}"
                                    ,   dis8 = "${dis8}"
                                    ,   dis9 = "${dis9}"
                                    ,   dis10 = "${dis10}"
                                    ,   dis11 = "${dis11}"
                                    ,   dis12 = "${dis12}"
                                    ,   dis13 = "${dis13}"
                                    ,   dis14 = "${dis14}"
                                    ,   upd_by = "${username}"
                                    ,   upd_date = NOW()
                                    ,   ACTIVE = "Y"
                                    WHERE house_id = "${result[0]['house_id']}"
                                `
                    console.log(updHouseDisaster)
                    con.query({sql:updHouseDisaster}, function (err, result) {
                        if (err) throw err;
                        console.log("house_disaster table " + result.affectedRows + " record(s) updated");
                    });
                }else{
                    var insHouseDisaster = 
                                `
                                    INSERT INTO
                                        house_disaster
                                        (
                                                disaster_type
                                            ,   dis1
                                            ,   dis2
                                            ,   dis3
                                            ,   dis4
                                            ,   dis5
                                            ,   dis6
                                            ,   dis7
                                            ,   dis8
                                            ,   dis9
                                            ,   dis10
                                            ,   dis11
                                            ,   dis12
                                            ,   dis13
                                            ,   dis14
                                            ,   house_id
                                            ,   cr_by
                                            ,   cr_date
                                            ,   ACTIVE
                                        )
                                    VALUES
                                        (
                                                '${disaster_type}'
                                            ,   '${dis1}'
                                            ,   '${dis2}'
                                            ,   '${dis3}'
                                            ,   '${dis4}'
                                            ,   '${dis5}'
                                            ,   '${dis6}'
                                            ,   '${dis7}'
                                            ,   '${dis8}'
                                            ,   '${dis9}'
                                            ,   '${dis10}'
                                            ,   '${dis11}'
                                            ,   '${dis12}'
                                            ,   '${dis13}'
                                            ,   '${dis14}'
                                            ,   '${house_id}'
                                            ,   '${username}'
                                            ,   NOW()
                                            ,   'Y'
                                        );
                                `
                    console.log(insHouseDisaster)
                    con.query({sql:insHouseDisaster}, function (err, result) {
                        if (err) throw err;
                        console.log("house_disaster table 1 record inserted");
                    });
                }
                console.log(error);
            })

            //house_envyprob
            var qryEnvyProb = `
                                SELECT 
                                    house_id
                                FROM
                                    house_envyprob
                                WHERE
                                    house_id = '${house_id}'
                                AND
                                    ACTIVE = 'Y'
                                ORDER BY house_id DESC;  
                                `
            console.log(qryEnvyProb)
            con.query({sql: qryEnvyProb}, (error, result, fields) => {
                var chk = result[0]
                console.log("envyprob houseId query record = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    var updHouseEnvyprob = 
                                `
                                    UPDATE house_envyprob
                                    SET
                                        envyprob_type = "${envyprob_type}"
                                    ,   ep1 = "${ep1}"
                                    ,   ep2 = "${ep2}"
                                    ,   ep3 = "${ep3}"
                                    ,   ep4 = "${ep4}"
                                    ,   ep5 = "${ep5}"
                                    ,   ep6 = "${ep6}"
                                    ,   ep7 = "${ep7}"
                                    ,   upd_by = "${username}"
                                    ,   upd_date = NOW()
                                    ,   ACTIVE = "Y"
                                    WHERE house_id = "${result[0]['house_id']}"
                                `
                    console.log(updHouseEnvyprob)
                    con.query({sql:updHouseEnvyprob}, function (err, result) {
                        if (err) throw err;
                        console.log("house_envyprob table " + result.affectedRows + " record(s) updated");
                    });
                }else{
                    var insHouseEnvyprob = 
                                `
                                    INSERT INTO
                                        house_envyprob
                                        (
                                                envyprob_type
                                            ,   ep1
                                            ,   ep2
                                            ,   ep3
                                            ,   ep4
                                            ,   ep5
                                            ,   ep6
                                            ,   ep7
                                            ,   house_id
                                            ,   cr_by
                                            ,   cr_date
                                            ,   ACTIVE
                                        )
                                    VALUES
                                        (
                                                '${envyprob_type}'
                                            ,   '${ep1}'
                                            ,   '${ep2}'
                                            ,   '${ep3}'
                                            ,   '${ep4}'
                                            ,   '${ep5}'
                                            ,   '${ep6}'
                                            ,   '${ep7}'
                                            ,   '${house_id}'
                                            ,   '${username}'
                                            ,   NOW()
                                            ,   'Y'
                                        );
                                `
                    console.log(insHouseEnvyprob)
                    con.query({sql:insHouseEnvyprob}, function (err, result) {
                        if (err) throw err;
                        console.log("house_envyprob table 1 record inserted");
                    });
                }
                console.log(error);
            })

            //house_problem
            var qryProblem = `
                                SELECT 
                                    house_id
                                FROM
                                    house_problem
                                WHERE
                                    house_id = '${house_id}'
                                AND
                                    ACTIVE = 'Y'
                                ORDER BY house_id DESC;  
                                `
            console.log(qryProblem)
            con.query({sql: qryProblem}, (error, result, fields) => {
                var chk = result[0]
                console.log("problem houseId query record = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    var updHouseProblem = 
                                `
                                    UPDATE house_problem
                                    SET
                                        prob1 = "${prob1}"
                                    ,   prob2 = "${prob2}"
                                    ,   prob3 = "${prob3}"
                                    ,   prob4 = "${prob4}"
                                    ,   prob5 = "${prob5}"
                                    ,   prob6 = "${prob6}"
                                    ,   prob7 = "${prob7}"
                                    ,   prob8 = "${prob8}"
                                    ,   prob9 = "${prob9}"
                                    ,   prob10 = "${prob10}"
                                    ,   problem_another = "${problem_another}"
                                    ,   upd_by = "${username}"
                                    ,   upd_date = NOW()
                                    ,   ACTIVE = "Y"
                                    WHERE house_id = "${result[0]['house_id']}"
                                `
                    console.log(updHouseProblem)
                    con.query({sql:updHouseProblem}, function (err, result) {
                        if (err) throw err;
                        res.json({ status: "ok"});
                        console.log("house_problem table " + result.affectedRows + " record(s) updated");
                    });
                }else{
                    var insHouseProblem = 
                                `
                                    INSERT INTO
                                        house_problem
                                        (
                                                prob1
                                            ,   prob2
                                            ,   prob3
                                            ,   prob4
                                            ,   prob5
                                            ,   prob6
                                            ,   prob7
                                            ,   prob8
                                            ,   prob9
                                            ,   prob10
                                            ,   problem_another
                                            ,   house_id
                                            ,   cr_by
                                            ,   cr_date
                                            ,   ACTIVE
                                        )
                                    VALUES
                                        (
                                                '${prob1}'
                                            ,   '${prob2}'
                                            ,   '${prob3}'
                                            ,   '${prob4}'
                                            ,   '${prob5}'
                                            ,   '${prob6}'
                                            ,   '${prob7}'
                                            ,   '${prob8}'
                                            ,   '${prob9}'
                                            ,   '${prob10}'
                                            ,   '${problem_another}'
                                            ,   '${house_id}'
                                            ,   '${username}'
                                            ,   NOW()
                                            ,   'Y'
                                        );
                                `
                    console.log(insHouseProblem)
                    con.query({sql:insHouseProblem}, function (err, result) {
                        if (err) throw err;
                        res.json({ status: "ok"});
                        console.log("house_problem table 1 record inserted");
                    });
                }
                console.log(error);
            })
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
