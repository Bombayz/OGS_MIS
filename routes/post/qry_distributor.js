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
                                CONCAT(t.prename,t.firstname," ",t.lastname) fullname
                            FROM
                                tr14 t
                            WHERE house_id = '${house_id}'
                        UNION
                            SELECT
                                CONCAT(lp.prename,lp.firstname," ",lp.lastname) fullname
                            FROM
                                latentpopulation lp
                            WHERE house_id = '${house_id}'
                        ORDER BY fullname DESC;
                        `
            console.log(qry);
            resp = {}
            distributorData = [];
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result
                console.log("result = " + JSON.stringify(chk));
                if (chk.length != 0) {
                    for(i = 0;i<result.length;i++){
                        distributorData.push(result[i])
                    } 
                    resp.distributorData = distributorData
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
