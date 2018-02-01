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
    try {
        if (req.body) {
            var qry =   `
                        SELECT
                                Distinct(t.house_id)
                            ,   t.house_no
                            ,   t.vilage_no
                            ,   IFNULL((SELECT h.survey_status FROM house h WHERE h.house_id = t.house_id),'0') survey_status
                        FROM
                            tr14 t
                        ORDER BY t.house_no DESC;

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
