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
router.get('/:house_id', function (req, res, next) {
    var param_house_id = req.params.house_id
    console.log(param_house_id);
    try {
        if (req.body) {
            var qry =   `SELECT 
                            p.dwellerstatus,
                            p.population_idcard,
                            pn.prename_detail,
                            p.firstname,
                            p.lastname
                        FROM
                            population p,
                            prename pn
                        WHERE
                            p.house_id = ${param_house_id}
                        AND
                            p.ACTIVE = 'Y'
                        AND
                            pn.ACTIVE = 'Y'
                        AND
                            p.prename_id = pn.prename_id
                        ORDER BY p.dwellerstatus ASC
                        `
            console.log(qry);
            //SELECT
            resp = {}
            tr14table_population = [];
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result
                console.log("re = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    for(i = 0;i<result.length;i++){
                        tr14table_population.push(result[i])
                    }
                    resp.tr14table_population = tr14table_population
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
