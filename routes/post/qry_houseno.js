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
    try {
        if (req.body) {
            var qry =   `SELECT 
                            DISTINCT(house_no)
                        FROM 
                            house
                        WHERE
                            ACTIVE = 'Y'
                        ORDER BY house_no DESC;
                        `
            console.log(qry);
            //SELECT
            resp = {}
            houseNoData = [];
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result
                console.log("re = " + JSON.stringify(chk));
                if (chk.length != 0) {
                    for(i = 0;i<result.length;i++){
                        houseNoData.push(result[i])
                    }
                    resp.houseNoData = houseNoData
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
