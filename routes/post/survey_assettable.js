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
router.post('/', function (req, res, next) {


    var json = req.body;
    var {population_idcard} = json
    try {
        if (req.body) {
            var qry =   `
                            SELECT
                                    'ที่ดิน' AS asset_name
                                    ,   
                                        (CASE
                                            WHEN pal.land_benefit = '0' THEN 'ที่พักอาศัย'
                                            WHEN pal.land_benefit = '1' THEN 'เพาะปลูก'
                                            WHEN pal.land_benefit = '2' THEN 'เลี้ยงสัตว์'
                                            ELSE 'ประกอบกิจการ'
                                        END) AS asset_status
                                    ,   CONCAT(pal.dimen3,' ตารางวา ',pal.dimen2,' งาน ',pal.dimen1,' ไร่ ') AS asset_amount
                                    ,   pal.land_running AS asset_key
                            FROM
                                population_asset_land pal
                            WHERE
                                pal.population_idcard = '${population_idcard}'
                            AND
                                pal.ACTIVE = 'Y'
                        UNION
                            SELECT
                                    'ยานพาหนะ' AS asset_name
                                    ,   (SELECT av.vtype_name FROM asset_vehicle av WHERE av.vtype_id = pav.vtype_id) AS asset_status
                                    ,   '1' AS asset_amount
                                    ,   pav.vehicle_running AS asset_key
                            FROM
                                population_asset_vehicle pav
                            
                            WHERE
                                pav.population_idcard = '${population_idcard}'
                            AND
                                pav.ACTIVE = 'Y'
                        UNION
                            SELECT
                                    'สัตว์เลี้ยงในครัวเรือน' AS  asset_name
                                    ,	(CASE
                                            WHEN pap.ptype_id = '1' THEN 'หมา'
                                            ELSE 'แมว'
                                        END) AS asset_status
                                    ,   pap.pet_amount AS  asset_amount
                                    ,   pap.pet_running AS asset_key
                            FROM
                                population_asset_pet pap
                            
                            WHERE 
                                pap.population_idcard = '${population_idcard}'
                            AND
                                pap.ACTIVE = 'Y'
                        UNION
                            SELECT
                                    'สัตว์เลี้ยงเพื่อการเกษตร' AS asset_name
                                    ,   paa.atype_name AS  asset_status
                                    ,   paa.animal_amount AS asset_amount
                                    ,   paa.animal_running AS asset_key
                            FROM
                                population_asset_animal paa
                            WHERE
                                paa.population_idcard = '${population_idcard}'
                            AND
                                paa.ACTIVE = 'Y'
                            ORDER BY asset_name DESC;
                        `
            console.log(qry);
            resp = {}
            data = [];
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result
                console.log("result = " + JSON.stringify(chk));
                if (chk.length != 0) {
                    for(i = 0;i<result.length;i++){
                        data.push(result[i])
                    } 
                    resp.data = data
                    resp.status = "ok"
                    res.json(resp);  
                                 
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
