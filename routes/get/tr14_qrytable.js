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
router.get('/:house_no/:house_id', function (req, res, next) {
    let search_house_no = req.params.house_no
    let search_house_id  = req.params.house_id

    if(search_house_no == " " && search_house_id == " "){
        search_house_no = ""
        search_house_id = ""
    }else{
        if(search_house_no == " "){
            search_house_no = "undefined"
        }
        if(search_house_id == " "){
            search_house_id = "undefined"
        }
    }
    try {
        if (req.body) {
            var qry =   `
                        SELECT
                            v.vilage_no,
                            v.vilage_name,
                            h.house_no,
                            h.house_id,
                            IFNULL	((SELECT CONCAT(pn.prename_detail,p.firstname,' ',p.lastname) AS population_name FROM population p,prename pn
                            WHERE
                                p.prename_id = pn.prename_id
                            AND
                                p.ACTIVE = 'Y'
                            AND
                                pn.ACTIVE = 'Y'
                            AND
                                p.dwellerstatus = '0'
                            AND
                                p.house_id = h.house_id
                            LIMIT 1),'<p style="color:red;">ไม่มีเจ้าบ้าน</p>') AS population_name
                        FROM
                            vilage v,
                            house h
                        WHERE
                            (
                                h.house_no LIKE '%${search_house_no}%'
                            OR
                                h.house_id LIKE '%${search_house_id}%'
                            )
                        AND
                            v.vilage_id = h.vilage_id
                        AND
                            v.ACTIVE = 'Y'
                        AND
                            h.ACTIVE = 'Y'
                        ORDER BY v.vilage_id,h.house_no,h.house_id DESC;
                        `
            console.log(qry);
            //SELECT
            resp = {}
            tr14table_data = [];
            con.query({sql: qry}, (error, result, fields) => {
                var chk = result
                console.log("re = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    for(i = 0;i<result.length;i++){
                        tr14table_data.push(result[i])
                    }
                    resp.tr14table_data = tr14table_data
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
