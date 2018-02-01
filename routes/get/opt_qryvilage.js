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
router.get('/:vilage_no/:vilage_name', function (req, res, next) {
    let search_vilage_no = req.params.vilage_no
    let search_vilage_name  = req.params.vilage_name

    if(search_vilage_no == " " && search_vilage_name == " "){
        search_vilage_no = ""
        search_vilage_name = ""
    }else{
        if(search_vilage_no == " "){
            search_vilage_no = "undefined"
        }
        if(search_vilage_name == " "){
            search_vilage_name = "undefined"
        }
    }
    
    console.log(search_vilage_no);
    try {
        if (req.body) {
            var qry =   `SELECT 
                            vilage_id
                            ,   vilage_no
                            ,   vilage_name
                            ,   survey_status
                        FROM 
                            vilage
                        WHERE
                        (
                            vilage_name LIKE '%${search_vilage_name}%'
                        OR
                            vilage_no LIKE '%${search_vilage_no}%'
                        )
                        AND
                            ACTIVE = 'Y'
                        ORDER BY vilage_id DESC,vilage_name DESC,vilage_no DESC,survey_status DESC;
                        `
            console.log(qry);
            //SELECT
            resp = {}
            data = [];
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result
                console.log("re = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
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
