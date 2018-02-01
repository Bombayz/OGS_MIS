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
    var {house_id} = json
    try {
        if (req.body) {
            var qry =   `
                            SELECT
                                    t.dweller
                                ,   t.prename
                                ,   t.firstname
                                ,   t.lastname
                                ,   t.idcard
                                ,   t.nationality
                                ,   t.sex
                                ,   t.vilage_no
                                ,   t.house_no
                                ,   t.house_id
                                ,   DATE_FORMAT(t.birthdate,'%Y-%m-%d') birthdate
                                ,   IFNULL((SELECT p.survey_status FROM population p WHERE p.population_idcard = t.idcard AND residence_status = '1'),'0') survey_status
                                ,   '1' AS residence_status
                            FROM
                                tr14 t
                            WHERE house_id = '${house_id}'
                        UNION
                            SELECT
                                    'ผู้อาศัย' AS dweller
                                ,   lp.prename
                                ,   lp.firstname
                                ,   lp.lastname
                                ,   lp.idcard
                                ,   lp.nationality
                                ,   lp.sex
                                ,   lp.vilage_no
                                ,   lp.house_no
                                ,   lp.house_id
                                ,   DATE_FORMAT(lp.birthdate,'%Y-%m-%d') birthdate
                                ,   IFNULL((SELECT p.survey_status FROM population p WHERE p.population_idcard = lp.idcard AND residence_status = '0'),'0') survey_status
                                ,   '0' AS residence_status
                            FROM
                                latentpopulation lp
                            WHERE house_id = '${house_id}'
                        ORDER BY dweller ASC,residence_status DESC;
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
