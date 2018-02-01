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
router.get('/:firstname/:lastname', function (req, res, next) {
    let search_firstname = req.params.firstname
    let search_lastname  = req.params.lastname

    if(search_firstname == " " && search_lastname == " "){
        search_firstname = ""
        search_lastname = ""
    }else{
        if(search_firstname == " "){
            search_firstname = "undefined"
        }
        if(search_lastname == " "){
            search_lastname = "undefined"
        }
    }
    try {
        if (req.body) {
            var qry =   `
                            SELECT
                                p.population_idcard,
                                p.survey_status
                            FROM
                                population p
                            WHERE
                                (
                                        p.firstname LIKE '%${search_firstname}%'
                                    OR
                                        p.lastname LIKE '%${search_lastname}%'
                                )
                            AND
                                p.ACTIVE = 'Y'
                            ORDER BY p.population_idcard DESC;
                        `
            console.log(qry);
            //response
            resp = {}
            resp_conge = {}
            //tr14
            data = [];
            //sub population
            data_conge = [];
            data_conta = [];
            data_disabled = [];
            data_agri = [];
            data_animal = [];
            data_govern = [];
            data_private = [];
            data_land = [];
            data_transport = [];
            data_vehicle = [];
            data_works = [];
            //sub house
            data_disaster = [];
            data_envyprob = [];
            data_problem = [];
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result
                console.log("qry result = " + JSON.stringify(chk));
                if (chk.length != 0) {
                    for(i = 0;i<result.length;i++){
                        if(result[i]['survey_status'] == '2'){
                            var subqry =   `
                                        SELECT
                                        *
                                        FROM
                                            house h,
                                            vilage v,
                                            population p,
                                            prename pn,
                                            nationality n
                                        WHERE
                                            h.house_id = p.house_id
                                        AND
                                            v.vilage_id = h.vilage_id
                                        AND
                                            p.prename_id = pn.prename_id
                                        AND
                                            p.nationality_id = n.nationality_id
                                        AND
                                            h.ACTIVE = 'Y'
                                        AND
                                            v.ACTIVE = 'Y'
                                        AND
                                            p.ACTIVE = 'Y'
                                        AND
                                            pn.ACTIVE = 'Y'
                                        AND
                                            n.ACTIVE = 'Y'
                                        AND
                                            p.population_idcard = '${result[i]['population_idcard']}'
                                        ORDER BY h.house_no,p.population_idcard DESC;
                                        `
                            console.log(subqry);
                            con.query({sql: subqry}, (sub_error, sub_result, sub_fields) => {
                                var subchk = result
                                console.log("subchk query result : " + JSON.stringify(subchk));
                                if (subchk.length != 0) {
                                    for(i = 0;i<sub_result.length;i++){
                                        //population_congenitalhis
                                        data.push(sub_result[i])
                                        var subqry_conge =  `
                                                            SELECT
                                                            *
                                                            FROM
                                                                population_congenitalhis
                                                            WHERE
                                                                ACTIVE = 'Y'
                                                            AND
                                                                population_idcard = '${result[i]['population_idcard']}';
                                                            `
                                        console.log(subqry_conge);
                                        con.query({sql: subqry_conge}, (ssub_error, ssub_result, ssub_fields) => {
                                            var ssubchk = ssub_result
                                            console.log("ssubchk query result : " + JSON.stringify(ssubchk));
                                            if (subqry_conge.length != 0) {
                                                for(i = 0;i<ssub_result.length;i++){
                                                    data_conge.push(ssub_result[i])
                                                }
                                                resp.data_conge = data_conge
                                                resp.status_conge = "ok"
                                            }else{
                                                res.json({ status_conge: "deny" });
                                            }
                                            console.log(ssub_error);
                                        });

                                        //population_contagioushis
                                        var subqry_conta =  `
                                                        SELECT
                                                        *
                                                        FROM
                                                            population_contagioushis
                                                        WHERE
                                                            ACTIVE = 'Y'
                                                        AND
                                                            population_idcard = '${result[i]['population_idcard']}';
                                                        `
                                        console.log(subqry_conta);
                                        con.query({sql: subqry_conta}, (ssub_error, ssub_result, ssub_fields) => {
                                            var ssubchk = ssub_result
                                            console.log("ssubchk query result : " + JSON.stringify(ssubchk));
                                            if (subqry_conta.length != 0) {
                                                for(i = 0;i<ssub_result.length;i++){
                                                    data_conta.push(ssub_result[i])
                                                }
                                                resp.data_conta = data_conta
                                                resp.status_conta = "ok"
                                            }else{
                                                resp.status_conta = "deny"
                                            }
                                            console.log(ssub_error);
                                        });
                                        
                                        //population_disabled
                                        var subqry_disabled =  `
                                                        SELECT
                                                        *
                                                        FROM
                                                            population_disabled
                                                        WHERE
                                                            ACTIVE = 'Y'
                                                        AND
                                                            population_idcard = '${result[i]['population_idcard']}';
                                                        `
                                        console.log(subqry_disabled);
                                        con.query({sql: subqry_disabled}, (ssub_error, ssub_result, ssub_fields) => {
                                            var ssubchk = ssub_result
                                            console.log("ssubchk query result : " + JSON.stringify(ssubchk));
                                            if (ssubchk.length != 0) {
                                                for(i = 0;i<ssub_result.length;i++){
                                                    data_disabled.push(ssub_result[i])
                                                }
                                                resp.data_disabled = data_disabled
                                                resp.status_disabled = "ok"
                                            }else{
                                                resp.status_disabled = "deny"
                                            }
                                            console.log(ssub_error);
                                        });

                                        //population_land
                                        var subqry_land =  `
                                                        SELECT
                                                        *
                                                        FROM
                                                            population_land
                                                        WHERE
                                                            ACTIVE = 'Y'
                                                        AND
                                                            population_idcard = '${result[i]['population_idcard']}';
                                                        `
                                        console.log(subqry_land);
                                        con.query({sql: subqry_land}, (ssub_error, ssub_result, ssub_fields) => {
                                            var ssubchk = ssub_result
                                            console.log("ssubchk query result : " + JSON.stringify(ssubchk));
                                            if (ssubchk.length != 0) {
                                                for(i = 0;i<ssub_result.length;i++){
                                                    data_land.push(ssub_result[i])
                                                }
                                                resp.data_land = data_land
                                                resp.status_land = "ok"
                                            }else{
                                                resp.status_land = "deny"
                                            }
                                            console.log(ssub_error);
                                        });

                                        //population_transport
                                        var subqry_transport =  `
                                                        SELECT
                                                        *
                                                        FROM
                                                            population_transport
                                                        WHERE
                                                            ACTIVE = 'Y'
                                                        AND
                                                            population_idcard = '${result[i]['population_idcard']}';
                                                        `
                                        console.log(subqry_transport);
                                        con.query({sql: subqry_transport}, (ssub_error, ssub_result, ssub_fields) => {
                                            var ssubchk = ssub_result
                                            console.log("ssubchk query result : " + JSON.stringify(ssubchk));
                                            if (ssubchk.length != 0) {
                                                for(i = 0;i<ssub_result.length;i++){
                                                    data_transport.push(ssub_result[i])
                                                }
                                                resp.data_transport = data_transport
                                                resp.status_transport = "ok"
                                            }else{
                                                resp.status_transport = "deny"
                                            }
                                            console.log(ssub_error);
                                        });


                                        //population_vehicle
                                        var subqry_vehicle =  `
                                                        SELECT
                                                        *
                                                        FROM
                                                            population_vehicle
                                                        WHERE
                                                            ACTIVE = 'Y'
                                                        AND
                                                            population_idcard = '${result[i]['population_idcard']}';
                                                        `
                                        console.log(subqry_vehicle);
                                        con.query({sql: subqry_vehicle}, (ssub_error, ssub_result, ssub_fields) => {
                                            var ssubchk = ssub_result
                                            console.log("ssubchk query result : " + JSON.stringify(ssubchk));
                                            if (ssubchk.length != 0) {
                                                for(i = 0;i<ssub_result.length;i++){
                                                    data_vehicle.push(ssub_result[i])
                                                }
                                                resp.data_vehicle = data_vehicle
                                                resp.status_vehicle = "ok"
                                            }else{
                                                resp.status_vehicle = "deny"
                                            }
                                            console.log(ssub_error);
                                        });


                                        //population_works
                                        var subqry_works =  `
                                                        SELECT
                                                        *
                                                        FROM
                                                            population_works
                                                        WHERE
                                                            ACTIVE = 'Y'
                                                        AND
                                                            population_idcard = '${result[i]['population_idcard']}';
                                                        `
                                        console.log(subqry_works);
                                        con.query({sql: subqry_works}, (ssub_error, ssub_result, ssub_fields) => {
                                            var ssubchk = ssub_result
                                            console.log("ssubchk query result : " + JSON.stringify(ssubchk));
                                            if (ssubchk.length != 0) {
                                                for(i = 0;i<ssub_result.length;i++){
                                                    data_works.push(ssub_result[i])
                                                    
                                                    //population_job_agriculture
                                                    var subqry_agri =  `
                                                                    SELECT
                                                                    *
                                                                    FROM
                                                                        population_job_agriculture
                                                                    WHERE
                                                                        ACTIVE = 'Y'
                                                                    AND
                                                                        works_id = '${result[i]['works_id']}';
                                                                    `
                                                    console.log(subqry_agri);
                                                    con.query({sql: subqry_agri}, (sssub_error, sssub_result, sssub_fields) => {
                                                        var sssubchk = sssub_result
                                                        console.log("sssubchk query result : " + JSON.stringify(sssubchk));
                                                        if (sssubchk.length != 0) {
                                                            for(i = 0;i<sssub_result.length;i++){
                                                                data_agri.push(sssub_result[i])
                                                            }
                                                            resp.data_agri = data_agri
                                                            resp.status_agri = "ok"
                                                        }else{
                                                            resp.status_agri = "deny"
                                                        }
                                                        console.log(sssub_error);
                                                    });

                                                     //population_job_animal
                                                    var subqry_animal =  `
                                                                    SELECT
                                                                    *
                                                                    FROM
                                                                        population_job_animal
                                                                    WHERE
                                                                        ACTIVE = 'Y'
                                                                    AND
                                                                        works_id = '${result[i]['works_id']}';
                                                                    `
                                                    console.log(subqry_animal);
                                                    con.query({sql: subqry_animal}, (sssub_error, sssub_result, sssub_fields) => {
                                                        var sssubchk = sssub_result
                                                        console.log("sssubchk query result : " + JSON.stringify(sssubchk));
                                                        if (sssubchk.length != 0) {
                                                            for(i = 0;i<sssub_result.length;i++){
                                                                data_animal.push(sssub_result[i])
                                                            }
                                                            resp.data_animal = data_animal
                                                            resp.status_animal = "ok"
                                                        }else{
                                                            resp.status_animal = "deny"
                                                        }
                                                        console.log(sssub_error);
                                                    });

                                                     //population_job_govern
                                                    var subqry_govern =  `
                                                                    SELECT
                                                                    *
                                                                    FROM
                                                                        population_job_govern
                                                                    WHERE
                                                                        ACTIVE = 'Y'
                                                                    AND
                                                                        works_id = '${result[i]['works_id']}';
                                                                    `
                                                    console.log(subqry_govern);
                                                    con.query({sql: subqry_govern}, (sssub_error, sssub_result, sssub_fields) => {
                                                        var sssubchk = sssub_result
                                                        console.log("sssubchk query result : " + JSON.stringify(sssubchk));
                                                        if (sssubchk.length != 0) {
                                                            for(i = 0;i<sssub_result.length;i++){
                                                                data_govern.push(sssub_result[i])
                                                            }
                                                            resp.data_govern = data_govern
                                                            resp.status_govern = "ok"
                                                        }else{
                                                            resp.status_govern = "deny"
                                                        }
                                                        console.log(sssub_error);
                                                    });

                                                    //population_job_private
                                                    var subqry_private =  `
                                                                    SELECT
                                                                    *
                                                                    FROM
                                                                        population_job_private
                                                                    WHERE
                                                                        ACTIVE = 'Y'
                                                                    AND
                                                                        works_id = '${result[i]['works_id']}';
                                                                    `
                                                    console.log(subqry_private);
                                                    con.query({sql: subqry_private}, (sssub_error, sssub_result, sssub_fields) => {
                                                        var sssubchk = sssub_result
                                                        console.log("sssubchk query result : " + JSON.stringify(sssubchk));
                                                        if (sssubchk.length != 0) {
                                                            for(i = 0;i<sssub_result.length;i++){
                                                                data_private.push(sssub_result[i])
                                                            }
                                                            resp.data_private = data_private
                                                            resp.status_private = "ok"
                                                            res.json(resp);
                                                        }else{
                                                            resp.status_private = "deny"
                                                            res.json(resp);
                                                        }
                                                        console.log(sssub_error);
                                                    });

                                                }
                                                resp.data_works = data_works
                                                resp.status_works = "ok"
                                            }else{
                                                resp.status_works = "deny"
                                                resp.status_private = "deny"
                                                resp.status_govern = "deny"
                                                resp.status_animal = "deny"
                                                resp.status_agri = "deny"
                                                res.json(resp);
                                            }
                                            console.log(ssub_error);
                                        });
                                    }
                                    
                                    resp.data = data
                                    resp.status = "ok"
                                }else{
                                    res.json({ status: "deny" });
                                }
                                console.log(sub_error);
                                console.log("choice 2");
                            })
                        }else{
                            var subqry =   `
                                        SELECT
                                        *
                                        FROM
                                            house h,
                                            vilage v,
                                            population p,
                                            prename pn,
                                            nationality n
                                        WHERE
                                            h.house_id = p.house_id
                                        AND
                                            v.vilage_id = h.vilage_id
                                        AND
                                            p.prename_id = pn.prename_id
                                        AND
                                            p.nationality_id = n.nationality_id
                                        AND
                                            h.ACTIVE = 'Y'
                                        AND
                                            v.ACTIVE = 'Y'
                                        AND
                                            p.ACTIVE = 'Y'
                                        AND
                                            pn.ACTIVE = 'Y'
                                        AND
                                            n.ACTIVE = 'Y'
                                        AND
                                            p.population_idcard = '${result[i]['population_idcard']}'
                                        ORDER BY h.house_no,p.population_idcard DESC;
                                        `
                            console.log(subqry);
                            con.query({sql: subqry}, (sub_error, sub_result, sub_fields) => {
                                var subchk = result
                                console.log("subchk query result : " + JSON.stringify(subchk));
                                if (subchk.length != 0) {
                                    for(i = 0;i<sub_result.length;i++){
                                        data.push(sub_result[i])
                                    }
                                    resp.data = data
                                    resp.status = "ok"
                                    res.json(resp);
                                }else{
                                    res.json({ status: "deny" });
                                }
                                console.log(sub_error);
                                console.log("choice another");
                            })
                        }
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
