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
router.post('/', function (req, res, next) {

    var json = req.body;
    var {population_idcard,residence_status} = json
    console.log(residence_status);
    console.log(population_idcard);
    try {
        if (req.body) {
            var qryPopulation =  `
                            SELECT
                                p.population_running
                                ,   p.population_idcard
                                ,   p.prename_id
                                ,   p.firstname
                                ,   p.lastname
                                ,   DATE_FORMAT(p.birthdate,'%Y-%m-%d') birthdate
                                ,   p.height
                                ,   p.weight
                                ,   p.sex
                                ,   p.bloodgroup
                                ,   p.living
                                ,   p.maritalstatus
                                ,   p.tel
                                ,   p.nationality_id
                                ,   p.house_id
                                ,   p.currentaddr
                                ,   p.currentaddr_province
                                ,   p.currentaddr_country
                                ,   p.dwellerstatus
                                ,   p.income
                                ,   p.income_money
                                ,   p.dept
                                ,   p.saving
                                ,   p.allergichis
                                ,   p.allergichis_detail
                                ,   p.disadvantage
                                ,   p.sub_al
                                ,   p.education
                                ,   p.education_class
                                ,   p.literacy
                                ,   p.technology
                                ,   p.expertise
                                ,   p.expertise_name
                                ,   p.expertise_detail
                                ,   p.religion
                                ,   p.religion_another
                                ,   p.participation
                                ,   p.election
                                ,   p.residence_status
                                ,   p.latentpop_province
                                ,   p.latentpop_country
                                ,   p.distributor
                                ,   p.survey_status
                                ,   IFNULL(DATE_FORMAT(p.upd_date,'%Y-%m-%d'),DATE_FORMAT(p.cr_date,'%Y-%m-%d')) savedate
                                ,   pcg.congh_id
                                ,   pcg.congh_type
                                ,   pcg.congh1
                                ,   pcg.congh2
                                ,   pcg.congh3
                                ,   pcg.congh4
                                ,   pcg.congh5
                                ,   pcg.congh_another
                                ,   pct.conth_id
                                ,   pct.conth_type
                                ,   pct.conth1
                                ,   pct.conth2
                                ,   pct.conth3
                                ,   pct.conth4
                                ,   pct.conth5
                                ,   pct.conth6
                                ,   pct.conth7
                                ,   pct.conth8
                                ,   pct.conth9
                                ,   pct.conth10
                                ,   pct.conth11
                                ,   pct.conth_another
                                ,   pd.disabled_id
                                ,   pd.disabled_type
                                ,   pd.disabled1
                                ,   pd.disabled2
                                ,   pd.disabled3
                                ,   pd.disabled4
                                ,   pd.disabled5
                                ,   pd.disabled6
                                ,   pt.transport_id
                                ,   pt.transport_type
                                ,   pt.trans1
                                ,   pt.trans2
                                ,   pt.trans3
                                ,   pt.trans4
                                ,   pw.works_id
                                ,   pw.works_type
                            FROM
                                population p
                                ,   population_congenitalhis pcg
                                ,   population_contagioushis pct
                                ,   population_disabled pd
                                ,   population_transport pt
                                ,   population_works pw
                            WHERE
                                population_idcard = '${population_idcard}'
                            AND
                                residence_status = '${residence_status}'
                            AND
                                p.population_running = pcg.population_running
                            AND
                                p.population_running = pct.population_running
                            AND
                                p.population_running = pd.population_running
                            AND
                                p.population_running = pt.population_running
                            AND
                                p.population_running = pw.population_running
                            ORDER BY p.population_running DESC;
                            `
            console.log(qryPopulation);
            con.query({sql: qryPopulation}, (error, result, fields) => {
                var chk = result[0]
                console.log(`population query record = '${JSON.stringify(chk)}'`);
                if (typeof chk != "undefined") {
                    res.json({ 
                        status: "ok"
                        ,   population_running: result[0]['population_running']
                        ,   population_idcard: result[0]['population_idcard']
                        ,   prename_id: result[0]['prename_id']
                        ,   firstname: result[0]['firstname']
                        ,   lastname: result[0]['lastname']
                        ,   birthdate: result[0]['birthdate']
                        ,   height: result[0]['height']
                        ,   weight: result[0]['weight']
                        ,   sex: result[0]['sex']
                        ,   bloodgroup: result[0]['bloodgroup']
                        ,   living: result[0]['living']
                        ,   maritalstatus: result[0]['maritalstatus']
                        ,   tel: result[0]['tel']
                        ,   nationality_id: result[0]['nationality_id']
                        ,   house_id: result[0]['house_id']
                        ,   currentaddr: result[0]['currentaddr']
                        ,   currentaddr_province: result[0]['currentaddr_province']
                        ,   currentaddr_country: result[0]['currentaddr_country']
                        ,   dwellerstatus: result[0]['dwellerstatus']
                        ,   income: result[0]['income']
                        ,   income_money: result[0]['income_money']
                        ,   dept: result[0]['dept']
                        ,   saving: result[0]['saving']
                        ,   allergichis: result[0]['allergichis']
                        ,   allergichis_detail: result[0]['allergichis_detail']
                        ,   disadvantage: result[0]['disadvantage']
                        ,   sub_al: result[0]['sub_al']
                        ,   education: result[0]['education']
                        ,   education_class: result[0]['education_class']
                        ,   literacy: result[0]['literacy']
                        ,   technology: result[0]['technology']
                        ,   expertise: result[0]['expertise']
                        ,   expertise_name: result[0]['expertise_name']
                        ,   expertise_detail: result[0]['expertise_detail']
                        ,   religion: result[0]['religion']
                        ,   religion_another: result[0]['religion_another']
                        ,   participation: result[0]['participation']
                        ,   election: result[0]['election']
                        ,   residence_status: result[0]['residence_status']
                        ,   latentpop_province: result[0]['latentpop_province']
                        ,   latentpop_country: result[0]['latentpop_country']
                        ,   survey_status: result[0]['survey_status']
                        ,   congh_id: result[0]['congh_id']
                        ,   congh_type: result[0]['congh_type']
                        ,   congh1: result[0]['congh1']
                        ,   congh2: result[0]['congh2']
                        ,   congh3: result[0]['congh3']
                        ,   congh4: result[0]['congh4']
                        ,   congh5: result[0]['congh5']
                        ,   congh_another: result[0]['congh_another']
                        ,   conth_id: result[0]['conth_id']
                        ,   conth1: result[0]['conth1']
                        ,   conth2: result[0]['conth2']
                        ,   conth3: result[0]['conth3']
                        ,   conth4: result[0]['conth4']
                        ,   conth5: result[0]['conth5']
                        ,   conth6: result[0]['conth6']
                        ,   conth7: result[0]['conth7']
                        ,   conth8: result[0]['conth8']
                        ,   conth9: result[0]['conth9']
                        ,   conth10: result[0]['conth10']
                        ,   conth11: result[0]['conth11']
                        ,   conth_another: result[0]['conth_another']
                        ,   disabled_id: result[0]['disabled_id']
                        ,   disabled_type: result[0]['disabled_type']
                        ,   transport_id: result[0]['transport_id']
                        ,   transport_type: result[0]['transport_type']
                        ,   trans1: result[0]['trans1']
                        ,   trans2: result[0]['trans2']
                        ,   trans3: result[0]['trans3']
                        ,   trans4: result[0]['trans4']
                        ,   works_id: result[0]['works_id']
                        ,   works_type: result[0]['works_type']    
                        ,   savedate: result[0]['savedate']
                        ,   disabled1: result[0]['disabled1']
                        ,   disabled2: result[0]['disabled2']
                        ,   disabled3: result[0]['disabled3']
                        ,   disabled4: result[0]['disabled4']
                        ,   disabled5: result[0]['disabled5']
                        ,   disabled6: result[0]['disabled6']
                    });
                } else {
                    res.json({ status: "deny" });
                }
                console.log(error);
            });
        } else {
            res.json({
                status: "deny"
            })
        }
    } catch (error) {
        res.json({ status: "deny" });
    }
});

module.exports = router;
