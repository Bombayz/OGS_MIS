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
// var coreF = require('../coreF');
/* POST users listing. */
router.post('/', function (req, res, next) {

    //main form
    var json = req.body;
    var population_idcard = json.population_idcard
    var prename_id = json.prename_id
    var firstname = json.firstname
    var lastname = json.lastname
    var birthdate = json.birthdate
    var height = json.height
    var weight = json.weight
    var sex = json.sex
    var bloodgroup = json.bloodgroup
    var living = json.living
    var maritalstatus = json.maritalstatus
    var tel = json.tel
    var nationality_id = json.nationality_id
    var house_id = json.house_id
    var currentaddr = json.currentaddr
    var currentaddr_province = json.currentaddr_province
    var currentaddr_country = json.currentaddr_country
    var dwellerstatus = json.dwellerstatus
    var income = json.income
    var income_money = json.income_money
    var dept = json.dept
    var saving = json.saving
    var allergichis = json.allergichis
    var allergichis_detail = json.allergichis_detail
    var disadvantage = json.disadvantage
    var sub_al = json.sub_al
    var education = json.education
    var education_class = json.education_class
    var literacy = json.literacy
    var technology = json.technology
    var expertise = json.expertise
    var expertise_name = json.expertise_name
    var expertise_detail = json.expertise_detail
    var religion = json.religion
    var religion_another = json.religion_another
    var participation = json.participation
    var election = json.election
    var residence_status = json.residence_status
    var latentpop_province = json.latentpop_province
    var latentpop_country = json.latentpop_country
    var distributor = json.distributor
    var survey_status = json.survey_status

    //username password
    let userid = json.userid
    let username = json.username

    var population_running

    //checkbox form

    var congh_type = json.congh_type
    var congh1 = json.congh1
    var congh2 = json.congh2
    var congh3 = json.congh3
    var congh4 = json.congh4
    var congh5 = json.congh5
    var congh_another = json.congh_another

    var conth_type = json.conth_type
    var conth1 = json.conth1
    var conth2 = json.conth2
    var conth3 = json.conth3
    var conth4 = json.conth4
    var conth5 = json.conth5
    var conth6 = json.conth5
    var conth7 = json.conth7
    var conth8 = json.conth8
    var conth9 = json.conth9
    var conth10 = json.conth10
    var conth11 = json.conth11
    var conth_another = json.conth_another

    var disabled_type = json.disabled_type
    var disabled1 = json.disabled1
    var disabled2 = json.disabled2
    var disabled3 = json.disabled3
    var disabled4 = json.disabled4
    var disabled5 = json.disabled5
    var disabled6 = json.disabled6

    var transport_type = json.transport_type
    var trans1 = json.trans1
    var trans2 = json.trans2
    var trans3 = json.trans3
    var trans4 = json.trans4

    var works_type = json.works_type

    var agricheck = json.agricheck
    var privatecheck = json.privatecheck
    var animalcheck = json.animalcheck
    var governcheck = json.governcheck

    var agri1 = json.agri1
    var agri2 = json.agri2
    var agri3 = json.agri3
    var agri4 = json.agri4
    var agri5 = json.agri5
    var agri6 = json.agri6
    var agri7 = json.agri7
    var agri8 = json.agri8
    var agri_another = json.agri_another

    var animal1 = json.animal1
    var animal2 = json.animal2
    var animal3 = json.animal3
    var animal4 = json.animal4
    var animal5 = json.animal5
    var animal6 = json.animal6
    var animal7 = json.animal7
    var animal8 = json.animal8
    var animal9 = json.animal9
    var animal_another = json.animal_another

    var govern1 = json.govern1
    var govern2 = json.govern2
    var govern3 = json.govern3
    var govern4 = json.govern4
    var govern_another = json.govern_another

    var private1 = json.private1
    var private2 = json.private2
    var private3 = json.private3
    var private4 = json.private4
    var private5 = json.private5
    var private6 = json.private6
    var private7 = json.private7
    var private_another = json.private_another

    //animal asset
    let animal_regis = json.animal_regis
    let animal_amount = json.animal_amount
    let atype_id = json.atype_id
    let infection = json.infection
    let infection_detail = json.infection_detail
    let shelter = json.shelter
    let diseasecontrol = json.diseasecontrol
    let diseasecontrol_by = json.diseasecontrol_by
    let disease_shelter = json.disease_shelter
    let market = json.market
    let market_place = json.market_place

    //vehicle asset
    let regisdate = json.regisdate
    let vtype_id = json.vtype_id
    let vehicle_rent = json.vehicle_rent

    //land asset
    let system_id = json.system_id
    let dimen1 = json.dimen1
    let dimen2 = json.dimen2
    let dimen3 = json.dimen3
    let land_benefit = json.land_benefit
    let land_location = json.land_location
    let land_tax = json.land_tax
    let land_rent = json.land_rent

    //pet asset
    let pet_regis = json.pet_regis
    let pet_amount = json.pet_amount
    let ptype_id = json.ptypet_id
    let pet_sex = json.pet_sex
    let vaccine = json.vaccine
    let vaccine_during = json.vaccine_during
    let vaccine_lastest = json.vaccine_lastest
    let pet_newborn = json.pet_newborn
    let pet_newborn_number = json.pet_newborn_number

    

    try {
        if (req.body) {
            var qryPopulation = 
                            `
                            SELECT  
                                    p.population_idcard
                                ,   pw.works_id
                                ,   pcg.congh_id
                                ,   pct.conth_id
                                ,   pt.transport_id
                                ,   pd.disabled_id
                                ,   p.population_running
                            FROM 
                                    population p
                                ,   population_congenitalhis pcg
                                ,   population_contagioushis pct
                                ,   population_disabled pd
                                ,   population_works pw
                                ,   population_transport pt
                            WHERE
                                p.ACTIVE = 'Y'
                            AND
                                pcg.ACTIVE = 'Y'
                            AND
                                pct.ACTIVE = 'Y'
                            AND
                                pd.ACTIVE = 'Y'
                            AND
                                pw.ACTIVE = 'Y'
                            AND
                                pt.ACTIVE = 'Y'
                            AND
                                p.population_running = pt.population_running
                            AND
                                p.population_running = pd.population_running
                            AND
                                p.population_running = pcg.population_running
                            AND
                                p.population_running = pct.population_running
                            AND
                                p.population_running = pw.population_running
                            AND
                                p.population_idcard = '${population_idcard}'
                            AND
                                p.residence_status = '${residence_status}'
                            ORDER BY p.population_running DESC;
                            `
            console.log(qryPopulation)
            con.query({sql: qryPopulation}, (error, result, fields) => {
                var chk = result[0]
                console.log("query record = " + JSON.stringify(chk));
                if (typeof chk != "undefined") {
                    //population
                    var updPopulation = 
                    `
                        UPDATE population
                        SET
                                prename_id = '${prename_id}'
                            ,   firstname = '${firstname}'
                            ,   lastname = '${lastname}'
                            ,   birthdate = '${birthdate}'
                            ,   height = '${height}'
                            ,   weight = '${weight}'
                            ,   sex = '${sex}'
                            ,   bloodgroup = '${bloodgroup}'
                            ,   living = '${living}'
                            ,   maritalstatus = '${maritalstatus}'
                            ,   tel = '${tel}'
                            ,   nationality_id = '${nationality_id}'
                            ,   house_id = '${house_id}'
                            ,   currentaddr = '${currentaddr}'
                            ,   currentaddr_province = '${currentaddr_province}'
                            ,   currentaddr_country = '${currentaddr_country}'
                            ,   dwellerstatus = '${dwellerstatus}'
                            ,   income  = '${income}'
                            ,   income_money = '${income_money}'
                            ,   dept = '${dept}'
                            ,   saving = '${saving}'
                            ,   allergichis = '${allergichis}'
                            ,   allergichis_detail = '${allergichis_detail}'
                            ,   disadvantage = '${disadvantage}'
                            ,   sub_al = '${sub_al}'
                            ,   education = '${education}'
                            ,   education_class = '${education_class}'
                            ,   literacy = '${literacy}'
                            ,   technology = '${technology}'
                            ,   expertise = '${expertise}'
                            ,   expertise_name = '${expertise_name}'
                            ,   expertise_detail = '${expertise_detail}'
                            ,   religion = '${religion}'
                            ,   religion_another = '${religion_another}'
                            ,   participation = '${participation}'
                            ,   election = '${election}'
                            ,   residence_status = '${residence_status}'
                            ,   latentpop_province = '${latentpop_province}'
                            ,   latentpop_country = '${latentpop_country}'
                            ,   distributor = '${distributor}'
                            ,   survey_status = '${survey_status}'
                            ,   upd_by = '${username}'
                            ,   upd_date = NOW()
                            ,   ACTIVE = 'Y'
                        WHERE population_running = '${result[0]['population_running']}';
                    `
                    console.log(updPopulation)
                    con.query({sql:updPopulation},(err, result) => {
                        if (err) throw err;
                        console.log("population table " + result.affectedRows + " record(s) updated");
                    });

                    //population_congenitalhis
                    var updPopulation_congenitalhis = 
                    `
                        UPDATE population_congenitalhis
                        SET
                                congh_type = '${congh_type}'
                            ,   congh1 = '${congh1}'
                            ,   congh2 = '${congh2}'
                            ,   congh3 = '${congh3}'
                            ,   congh4 = '${congh4}'
                            ,   congh5 = '${congh5}'
                            ,   congh_another = '${congh_another}'
                            ,   cr_by = '${username}'
                            ,   cr_date = NOW()
                            ,   ACTIVE = 'Y'
                        WHERE population_running = '${result[0]['population_running']}';
                    `
                    console.log(updPopulation_congenitalhis)
                    con.query({sql:updPopulation_congenitalhis},(err, result) => {
                        if (err) throw err;
                        console.log("population_congenitalhis " + result.affectedRows + " record(s) updated");
                    });

                    //population_contagioushis
                    var updPopulation_contagioushis = 
                    `
                        UPDATE population_contagioushis
                        SET
                                conth_type = '${conth_type}'
                            ,   conth1 = '${conth1}'
                            ,   conth2 = '${conth2}'
                            ,   conth3 = '${conth3}'
                            ,   conth4 = '${conth4}'
                            ,   conth5 = '${conth5}'
                            ,   conth6 = '${conth6}'
                            ,   conth7 = '${conth7}'
                            ,   conth8 = '${conth8}'
                            ,   conth9 = '${conth9}'
                            ,   conth10 = '${conth10}'
                            ,   conth11 = '${conth11}'
                            ,   conth_another = '${conth_another}'
                            ,   cr_by = '${username}'
                            ,   cr_date = NOW()
                            ,   ACTIVE = 'Y'
                            WHERE population_running = '${result[0]['population_running']}';
                    `
                    console.log(updPopulation_contagioushis)
                    con.query({sql:updPopulation_contagioushis},(err, result) => {
                        if (err) throw err;
                        console.log("population_contagioushis " + result.affectedRows + " record(s) updated");
                    });

                    //population_disabled
                    var updPopulation_disabled = 
                    `
                        UPDATE population_disabled
                        SET
                                disabled_type = '${disabled_type}'
                            ,   disabled1 = '${disabled1}'
                            ,   disabled2 = '${disabled2}'
                            ,   disabled3 = '${disabled3}'
                            ,   disabled4 = '${disabled4}'
                            ,   disabled5 = '${disabled5}'
                            ,   disabled6 = '${disabled6}'
                            ,   cr_by = '${username}'
                            ,   cr_date = NOW()
                            ,   ACTIVE = 'Y'
                        WHERE population_running = '${result[0]['population_running']}';
                    `
                    console.log(updPopulation_disabled)
                    con.query({sql:updPopulation_disabled},(err, result) => {
                        if (err) throw err;
                        console.log("population_disabled table " + result.affectedRows + " record(s) updated");
                    });

                    //population_transport
                    var updPopulation_transport = 
                    `
                        UPDATE population_transport
                        SET
                                transport_type = '${transport_type}'
                            ,   trans1 = '${trans1}'
                            ,   trans2 = '${trans2}'
                            ,   trans3 = '${trans3}'
                            ,   trans4 = '${trans4}'
                            ,   cr_by = '${username}'
                            ,   cr_date = NOW()
                            ,   ACTIVE = 'Y'
                        WHERE population_running = '${result[0]['population_running']}';
                    `
                    console.log(updPopulation_transport)
                    con.query({sql:updPopulation_transport},(err, result) => {
                        if (err) throw err;
                        console.log("population_transport " + result.affectedRows + " record(s) updated");
                    });

                    //population_work
                    var updPopulation_works = 
                    `
                        UPDATE population_works
                        SET
                                works_type = '${works_type}'
                            ,   cr_by = '${username}'
                            ,   cr_date = NOW()
                            ,   ACTIVE = 'Y'
                        WHERE population_running = '${result[0]['population_running']}';
                    `
                    console.log(updPopulation_works)
                    con.query({sql:updPopulation_works},(err, result) => {
                        if (err) throw err;
                        console.log("population_works table " + result.affectedRows + " record(s) updated");
                    });

                    //query population_works
                    var qryWorks = `
                    SELECT 
                            works_id
                        ,   works_type
                    FROM
                        population_works
                    WHERE
                        population_running = '${result[0]['population_running']}'
                    AND
                        ACTIVE = 'Y'
                    ORDER BY works_id DESC;  
                    `
                    console.log(qryWorks)
                    con.query({sql: qryWorks}, (works_error, works_result, works_fields) => {
                        var works_chk = works_result[0]
                        console.log("worksId query record = " + JSON.stringify(works_chk));
                        if (typeof works_chk != "undefined") {
                            if(works_result[0]['works_type'] == '1'){
                                //query population_job_agriculture
                                var qryAgri = `
                                                SELECT agri_id,works_id
                                                FROM population_job_agriculture 
                                                WHERE works_id = '${works_result[0]['works_id']}'
                                                AND ACTIVE = 'Y'
                                                ORDER BY agri_id DESC;  
                                                `
                                console.log(qryAgri)
                                con.query({sql: qryAgri}, (subworks_error, subworks_result, subworks_fields) => {
                                    var subworks_chk = subworks_result[0]
                                    console.log("population_job_agriculture query record = " + JSON.stringify(subworks_chk));
                                    if (typeof subworks_chk != "undefined") {
                                        if(agricheck == '1'){
                                            //update population_job_agriculture
                                            var updPopulation_job_agriculture = 
                                            `
                                                UPDATE population_job_agriculture
                                                SET
                                                        
                                                        agri1 = '${agri1}'
                                                    ,   agri2 = '${agri2}'
                                                    ,   agri3 = '${agri3}'
                                                    ,   agri4 = '${agri4}'
                                                    ,   agri5 = '${agri5}'
                                                    ,   agri6 = '${agri6}'
                                                    ,   agri7 = '${agri7}'
                                                    ,   agri8 = '${agri8}'
                                                    ,   agri_another = '${agri_another}'
                                                    ,   upd_by = '${username}'
                                                    ,   upd_date = NOW()
                                                    ,   ACTIVE = 'Y'
                                                WHERE agri_id = '${subworks_result[0]['agri_id']}'
                                            `
                                            console.log(updPopulation_job_agriculture)
                                            con.query({sql:updPopulation_job_agriculture},(err, result) => {
                                                if (err) throw err;
                                                console.log("population_job_agriculture table " + result.affectedRows + " record updated");
                                            });
                                        }else{
                                            //population_job_agriculture
                                            var delPopulation_job_agriculture = 
                                            `
                                            DELETE TABLE population_job_agriculture
                                            WHERE works_id = "${subworks_result[0]['works_id']}"
                                            `
                                            console.log(delPopulation_job_agriculture)
                                            con.query({sql:delPopulation_job_agriculture}, function (err, result) {
                                                if (err) throw err;
                                                console.log("population_job_agriculture table " + result.affectedRows + " record(s) deleted");
                                            });
                                        }

                                    }else{
                                        //insert population_job_agriculture
                                        var insPopulation_job_agriculture = 
                                        `
                                            INSERT INTO 
                                                population_job_agriculture
                                                (
                                                        works_id
                                                    ,   agri1
                                                    ,   agri2
                                                    ,   agri3
                                                    ,   agri4
                                                    ,   agri5
                                                    ,   agri6
                                                    ,   agri7
                                                    ,   agri8
                                                    ,   agri_another
                                                    ,   cr_by
                                                    ,   cr_date
                                                    ,   ACTIVE
                                                )
                                            VALUES
                                                (
                                                        '${works_result[0]['works_id']}'
                                                    ,   '${agri1}'
                                                    ,   '${agri2}'
                                                    ,   '${agri3}'
                                                    ,   '${agri4}'
                                                    ,   '${agri5}'
                                                    ,   '${agri6}'
                                                    ,   '${agri7}'
                                                    ,   '${agri8}'
                                                    ,   '${agri_another}'
                                                    ,   '${username}'
                                                    ,   NOW()
                                                    ,   'Y'
                                                );
                                        `
                                        console.log(insPopulation_job_agriculture)
                                        con.query({sql:insPopulation_job_agriculture},(err, result) => {
                                            if (err) throw err;
                                            console.log("population_job_agriculture table 1 record inserted");
                                        });
                                    }
                                    console.log(subworks_error);
                                })

                                //query population_job_private
                                var qryPrivate = `
                                                SELECT private_id ,works_id
                                                FROM population_job_private 
                                                WHERE works_id = '${works_result[0]['works_id']}'
                                                AND ACTIVE = 'Y'
                                                ORDER BY private_id DESC;  
                                                `
                                console.log(qryPrivate)
                                con.query({sql: qryPrivate}, (subworks_error, subworks_result, subworks_fields) => {
                                    var subworks_chk = subworks_result[0]
                                    console.log("population_job_private query record = " + JSON.stringify(subworks_chk));
                                    if (typeof subworks_chk != "undefined") {
                                        if(privatecheck == '1'){
                                            //update population_job_private
                                            var updPopulation_job_private = 
                                            `
                                                UPDATE population_job_private
                                                SET
                                                        private1 = '${private1}'
                                                    ,   private2 = '${private2}'
                                                    ,   private3 = '${private3}'
                                                    ,   private4 = '${private4}'
                                                    ,   private5 = '${private5}'
                                                    ,   private6 = '${private6}'
                                                    ,   private7 = '${private7}'
                                                    ,   private_another = '${private_another}'
                                                    ,   upd_by = '${username}'
                                                    ,   upd_date = NOW()
                                                    ,   ACTIVE = 'Y'
                                                WHERE private_id = '${subworks_result[0]['private_id']}'
                                            `
                                            console.log(updPopulation_job_private)
                                            con.query({sql:updPopulation_job_private},(err, result) => {
                                                if (err) throw err;
                                                console.log("population_job_private table " + result.affectedRows + " record updated");
                                            });
                                        }else{
                                            //population_job_private
                                            var delPopulation_job_private = 
                                            `
                                            DELETE TABLE population_job_private
                                            WHERE works_id = "${subworks_result[0]['works_id']}"
                                            `
                                            console.log(delPopulation_job_private)
                                            con.query({sql:delPopulation_job_private}, function (err, result) {
                                                if (err) throw err;

                                                console.log("population_job_private table " + result.affectedRows + " record(s) deleted");
                                            });
                                        }
                                    }else{
                                        //insert population_job_private
                                        var insPopulation_job_private = 
                                        `
                                            INSERT INTO 
                                                population_job_private
                                                (
                                                        works_id
                                                    ,   private1
                                                    ,   private2
                                                    ,   private3
                                                    ,   private4
                                                    ,   private5
                                                    ,   private6
                                                    ,   private7
                                                    ,   private_another
                                                    ,   cr_by
                                                    ,   cr_date
                                                    ,   ACTIVE
                                                )
                                            VALUES
                                                (
                                                        '${works_result[0]['works_id']}'
                                                    ,   '${private1}'
                                                    ,   '${private2}'
                                                    ,   '${private3}'
                                                    ,   '${private4}'
                                                    ,   '${private5}'
                                                    ,   '${private6}'
                                                    ,   '${private7}'
                                                    ,   '${private_another}'
                                                    ,   '${username}'
                                                    ,   NOW()
                                                    ,   'Y'
                                                );
                                        `
                                        console.log(insPopulation_job_private)
                                        con.query({sql:insPopulation_job_private},(err, result) => {
                                            if (err) throw err;
                                            console.log("population_job_private table 1 record inserted");
                                        });
                                    }
                                    console.log(subworks_error);
                                })

                                //query population_job_animal
                                var qryAnimal = `
                                                SELECT animal_id ,works_id
                                                FROM population_job_animal 
                                                WHERE works_id = '${result[0]['works_id']}'
                                                AND ACTIVE = 'Y'
                                                ORDER BY animal_id DESC;  
                                                `
                                console.log(qryAnimal)
                                con.query({sql: qryAnimal}, (subworks_error, subworks_result, subworks_fields) => {
                                    var subworks_chk = subworks_result[0]
                                    console.log("population_job_animal query record = " + JSON.stringify(subworks_chk));
                                    if (typeof subworks_chk != "undefined") {
                                        if(animalcheck == '1'){
                                            //update population_job_animal
                                            var updPopulation_job_animal = 
                                            `
                                                UPDATE population_job_animal
                                                SET
                                                        animal1 = '${animal1}'
                                                    ,   animal2 = '${animal2}'
                                                    ,   animal3 = '${animal3}'
                                                    ,   animal4 = '${animal4}'
                                                    ,   animal5 = '${animal5}'
                                                    ,   animal6 = '${animal6}'
                                                    ,   animal7 = '${animal7}'
                                                    ,   animal_another = '${animal_another}'
                                                    ,   upd_by = '${username}'
                                                    ,   upd_date = NOW()
                                                    ,   ACTIVE = 'Y'
                                                WHERE animal_id = '${subworks_result[0]['animal_id']}'
                                            `
                                            console.log(updPopulation_job_animal)
                                            con.query({sql:updPopulation_job_animal},(err, result) => {
                                                if (err) throw err;
                                                console.log("population_job_animal " + result.affectedRows + " record updated");
                                            });
                                        }else{
                                            //population_job_animal
                                            var delPopulation_job_animal = 
                                            `
                                            DELETE TABLE population_job_animal
                                            WHERE works_id = "${result[0]['works_id']}"
                                            `
                                            console.log(delPopulation_job_animal)
                                            con.query({sql:delPopulation_job_animal}, function (err, result) {
                                                if (err) throw err;
                                                console.log("population_job_animal table " + result.affectedRows + " record(s) deleted");
                                            });
                                        }
                                    }else{
                                        //insert population_job_animal
                                        var insPopulation_job_animal = 
                                        `
                                            INSERT INTO 
                                                population_job_animal
                                                (
                                                        works_id
                                                    ,   animal1
                                                    ,   animal2
                                                    ,   animal3
                                                    ,   animal4
                                                    ,   animal5
                                                    ,   animal6
                                                    ,   animal7
                                                    ,   animal8
                                                    ,   animal9
                                                    ,   animal_another
                                                    ,   cr_by
                                                    ,   cr_date
                                                    ,   ACTIVE
                                                )
                                            VALUES
                                                (
                                                        '${works_result[0]['works_id']}'
                                                    ,   '${animal1}'
                                                    ,   '${animal2}'
                                                    ,   '${animal3}'
                                                    ,   '${animal4}'
                                                    ,   '${animal5}'
                                                    ,   '${animal6}'
                                                    ,   '${animal7}'
                                                    ,   '${animal8}'
                                                    ,   '${animal9}'
                                                    ,   '${animal_another}'
                                                    ,   '${username}'
                                                    ,   NOW()
                                                    ,   'Y'
                                                );
                                        `
                                        console.log(insPopulation_job_animal)
                                        con.query({sql:insPopulation_job_animal},(err, result) => {
                                            if (err) throw err;
                                            console.log("population_job_animal table 1 record inserted");
                                        });
                                    }
                                    console.log(subworks_error);
                                })

                                //query population_job_govern
                                var qryGovern = `
                                            SELECT govern_id ,works_id
                                            FROM population_job_govern 
                                            WHERE works_id = '${works_result[0]['works_id']}'
                                            AND ACTIVE = 'Y'
                                            ORDER BY govern_id DESC;  
                                            `
                                console.log(qryGovern)
                                con.query({sql: qryGovern}, (subworks_error, subworks_result, subworks_fields) => {
                                    var subworks_chk = subworks_result[0]
                                    console.log("population_job_govern query record = " + JSON.stringify(subworks_chk));
                                    if (typeof subworks_chk != "undefined") {
                                        if(governcheck == '1'){
                                            //update population_job_govern
                                            var updPopulation_job_govern = 
                                            `
                                                UPDATE population_job_private
                                                SET
                                                        
                                                        govern1 = '${govern1}'
                                                    ,   govern2 = '${govern2}'
                                                    ,   govern3 = '${govern3}'
                                                    ,   govern4 = '${govern4}'
                                                    ,   govern_another = '${govern_another}'
                                                    ,   upd_by = '${username}'
                                                    ,   upd_date = NOW()
                                                    ,   ACTIVE = 'Y'
                                                WHERE govern_id = '${subworks_chk[0]['govern_id']}'
                                            `
                                            console.log(updPopulation_job_govern)
                                            con.query({sql:updPopulation_job_govern},(err, result) => {
                                                if (err) throw err;
                                                console.log("population_job_govern table " + result.affectedRows + " record updated");
                                                res.json({
                                                    status: "ok"
                                                })
                                            });
                                        }else{
                                            //population_job_govern
                                            var delPopulation_job_govern = 
                                            `
                                            DELETE TABLE population_job_govern
                                            WHERE works_id = "${subworks_result[0]['works_id']}"
                                            `
                                            console.log(delPopulation_job_govern)
                                            con.query({sql:delPopulation_job_govern}, function (err, result) {
                                                if (err) throw err;
                                                console.log("population_job_govern table " + result.affectedRows + " record(s) deleted");
                                                res.json({
                                                    status: "ok"
                                                })
                                            });
                                        }
                                    }else{
                                        //insert population_job_govern
                                        var insPopulation_job_govern = 
                                        `
                                            INSERT INTO 
                                                population_job_govern
                                                (
                                                        works_id
                                                    ,   govern1
                                                    ,   govern2
                                                    ,   govern3
                                                    ,   govern4
                                                    ,   govern_another
                                                    ,   cr_by
                                                    ,   cr_date
                                                    ,   ACTIVE
                                                )
                                            VALUES
                                                (
                                                        '${works_result[0]['works_id']}'
                                                    ,   '${govern1}'
                                                    ,   '${govern2}'
                                                    ,   '${govern3}'
                                                    ,   '${govern4}'
                                                    ,   '${govern_another}'
                                                    ,   '${username}'
                                                    ,   NOW()
                                                    ,   'Y'
                                                );
                                        `
                                        console.log(insPopulation_job_govern)
                                        con.query({sql:insPopulation_job_govern},(err, result) => {
                                            if (err) throw err;
                                            console.log("population_job_govern table 1 record inserted");
                                            res.json({
                                                status: "ok"
                                            })
                                        });
                                    }
                                    console.log(subworks_error);
                                })
                            }else{
                                console.log(works_result[0]['works_id'])
                                //population_job_agriculture
                                var delPopulation_job_agriculture = 
                                `
                                DELETE FROM population_job_agriculture
                                WHERE works_id = "${works_result[0]['works_id']}"
                                `
                                console.log(delPopulation_job_agriculture)
                                con.query({sql:delPopulation_job_agriculture}, function (err, result) {
                                    if (err) throw err;
                                    console.log("population_job_agriculture table " + result.affectedRows + " record(s) deleted");
                                });

                                //population_job_animal
                                var delPopulation_job_animal = 
                                `
                                DELETE FROM population_job_animal
                                WHERE works_id = "${works_result[0]['works_id']}"
                                `
                                console.log(delPopulation_job_animal)
                                con.query({sql:delPopulation_job_animal}, function (err, result) {
                                    if (err) throw err;
                                    console.log("population_job_animal table " + result.affectedRows + " record(s) deleted");
                                });

                                //population_job_govern
                                var delPopulation_job_govern = 
                                `
                                DELETE FROM population_job_govern
                                WHERE works_id = "${works_result[0]['works_id']}"
                                `
                                console.log(delPopulation_job_govern)
                                con.query({sql:delPopulation_job_govern}, function (err, result) {
                                    if (err) throw err;
                                    console.log("population_job_govern table " + result.affectedRows + " record(s) deleted");
                                });

                                //population_job_private
                                var delPopulation_job_private = 
                                `
                                DELETE FROM population_job_private
                                WHERE works_id = "${works_result[0]['works_id']}"
                                `
                                console.log(delPopulation_job_private)
                                con.query({sql:delPopulation_job_private}, function (err, result) {
                                    if (err) throw err;
                                    res.json({
                                        status: "ok"
                                    })
                                    console.log("population_job_private table " + result.affectedRows + " record(s) deleted");
                                });
                            
                            }
                        }
                        console.log(works_error);
                    })
                }else{

                    //population
                    var insPopulation = 
                    `
                        INSERT INTO 
                            population
                            (
                                    population_idcard
                                ,   prename_id
                                ,   firstname
                                ,   lastname
                                ,   birthdate
                                ,   height
                                ,   weight
                                ,   sex
                                ,   bloodgroup
                                ,   living
                                ,   maritalstatus
                                ,   tel
                                ,   nationality_id
                                ,   house_id
                                ,   currentaddr
                                ,   currentaddr_province
                                ,   currentaddr_country
                                ,   dwellerstatus
                                ,   income 
                                ,   income_money
                                ,   dept
                                ,   saving
                                ,   allergichis
                                ,   allergichis_detail
                                ,   disadvantage
                                ,   sub_al
                                ,   education
                                ,   education_class
                                ,   literacy
                                ,   technology
                                ,   expertise
                                ,   expertise_name
                                ,   expertise_detail
                                ,   religion
                                ,   religion_another
                                ,   participation
                                ,   election
                                ,   residence_status
                                ,   latentpop_province
                                ,   latentpop_country
                                ,   distributor
                                ,   survey_status
                                ,   cr_by
                                ,   cr_date
                                ,   ACTIVE
                            )
                        VALUES
                            (
                                    '${population_idcard}'
                                ,   '${prename_id}'
                                ,   '${firstname}'
                                ,   '${lastname}'
                                ,   '${birthdate}'
                                ,   '${height}'
                                ,   '${weight}'
                                ,   '${sex}'
                                ,   '${bloodgroup}'
                                ,   '${living}'
                                ,   '${maritalstatus}'
                                ,   '${tel}'
                                ,   '${nationality_id}'
                                ,   '${house_id}'
                                ,   '${currentaddr}'
                                ,   '${currentaddr_province}'
                                ,   '${currentaddr_country}'
                                ,   '${dwellerstatus}'
                                ,   '${income}'
                                ,   '${income_money}'
                                ,   '${dept}'
                                ,   '${saving}'
                                ,   '${allergichis}'
                                ,   '${allergichis_detail}'
                                ,   '${disadvantage}'
                                ,   '${sub_al}'
                                ,   '${education}'
                                ,   '${education_class}'
                                ,   '${literacy}'
                                ,   '${technology}'
                                ,   '${expertise}'
                                ,   '${expertise_name}'
                                ,   '${expertise_detail}'
                                ,   '${religion}'
                                ,   '${religion_another}'
                                ,   '${participation}'
                                ,   '${election}'
                                ,   '${residence_status}'
                                ,   '${latentpop_province}'
                                ,   '${latentpop_country}'
                                ,   '${distributor}'
                                ,   '${survey_status}'
                                ,   '${username}'
                                ,   NOW()
                                ,   'Y'
                            );
                    `
                    console.log(insPopulation)
                    con.query({sql:insPopulation},(err, result) => {
                        if (err) throw err;
                        console.log("population table 1 record inserted");
                    });


                    var qryKey = 
                                    `
                                    SELECT  
                                        population_running
                                    FROM
                                        population
                                    WHERE
                                        population_idcard = '${population_idcard}'
                                    AND
                                        residence_status = '${residence_status}'
                                    AND
                                        ACTIVE = 'Y'
                                    ORDER BY population_running
                                    `
                    console.log(qryKey)
                    con.query({sql: qryKey}, (sub_error, sub_result, sub_fields) => {
                        var qrychk = sub_result[0]
                        console.log("query record = " + JSON.stringify(qrychk));
                        if (typeof qrychk != "undefined") {
                            //population_congenitalhis
                            var insPopulation_congenitalhis = 
                            `
                                INSERT INTO 
                                    population_congenitalhis
                                    (
                                            congh_type
                                        ,   congh1
                                        ,   congh2
                                        ,   congh3
                                        ,   congh4
                                        ,   congh5
                                        ,   congh_another
                                        ,   population_running
                                        ,   cr_by
                                        ,   cr_date
                                        ,   ACTIVE
                                    )
                                VALUES
                                    (
                                            '${congh_type}'
                                        ,   '${congh1}'
                                        ,   '${congh2}'
                                        ,   '${congh3}'
                                        ,   '${congh4}'
                                        ,   '${congh5}'
                                        ,   '${congh_another}'
                                        ,   '${sub_result[0]['population_running']}'
                                        ,   '${username}'
                                        ,   NOW()
                                        ,   'Y'
                                    );
                            `
                            console.log(insPopulation_congenitalhis)
                            con.query({sql:insPopulation_congenitalhis},(err, result) => {
                                if (err) throw err;
                                console.log("population_congenitalhis table 1 record inserted");
                            });

                            //population_contagioushis
                            var insPopulation_contagioushis = 
                            `
                                INSERT INTO 
                                    population_contagioushis
                                    (
                                            conth_type
                                        ,   conth1
                                        ,   conth2
                                        ,   conth3
                                        ,   conth4
                                        ,   conth5
                                        ,   conth6
                                        ,   conth7
                                        ,   conth8
                                        ,   conth9
                                        ,   conth10
                                        ,   conth11
                                        ,   conth_another
                                        ,   population_running
                                        ,   cr_by
                                        ,   cr_date
                                        ,   ACTIVE
                                    )
                                VALUES
                                    (
                                            '${conth_type}'
                                        ,   '${conth1}'
                                        ,   '${conth2}'
                                        ,   '${conth3}'
                                        ,   '${conth4}'
                                        ,   '${conth5}'
                                        ,   '${conth6}'
                                        ,   '${conth7}'
                                        ,   '${conth8}'
                                        ,   '${conth9}'
                                        ,   '${conth10}'
                                        ,   '${conth11}'
                                        ,   '${conth_another}'
                                        ,   '${sub_result[0]['population_running']}'
                                        ,   '${username}'
                                        ,   NOW()
                                        ,   'Y'
                                    );
                            `
                            console.log(insPopulation_contagioushis)
                            con.query({sql:insPopulation_contagioushis},(err, result) => {
                                if (err) throw err;
                                console.log("population_contagioushis table 1 record inserted");
                            });

                            //population_disabled
                            var insPopulation_disabled = 
                            `
                                INSERT INTO 
                                    population_disabled
                                    (
                                            disabled_type  
                                        ,   disabled1
                                        ,   disabled2
                                        ,   disabled3
                                        ,   disabled4
                                        ,   disabled5
                                        ,   disabled6
                                        ,   population_running
                                        ,   cr_by
                                        ,   cr_date
                                        ,   ACTIVE
                                    )
                                VALUES
                                    (
                                            '${disabled_type}'
                                        ,   '${disabled1}'
                                        ,   '${disabled2}'
                                        ,   '${disabled3}'
                                        ,   '${disabled4}'
                                        ,   '${disabled5}'
                                        ,   '${disabled6}'
                                        ,   '${sub_result[0]['population_running']}'
                                        ,   '${username}'
                                        ,   NOW()
                                        ,   'Y'
                                    );
                            `
                            console.log(insPopulation_disabled)
                            con.query({sql:insPopulation_disabled},(err, result) => {
                                if (err) throw err;
                                console.log("population_disabled table 1 record inserted");
                            });

                            //population_transport
                            var insPopulation_transport = 
                            `
                                INSERT INTO 
                                    population_transport
                                    (
                                            transport_type  
                                        ,   trans1
                                        ,   trans2
                                        ,   trans3
                                        ,   trans4
                                        ,   population_running
                                        ,   cr_by
                                        ,   cr_date
                                        ,   ACTIVE
                                    )
                                VALUES
                                    (
                                            '${transport_type}'
                                        ,   '${trans1}'
                                        ,   '${trans2}'
                                        ,   '${trans3}'
                                        ,   '${trans4}'
                                        ,   '${sub_result[0]['population_running']}'
                                        ,   '${username}'
                                        ,   NOW()
                                        ,   'Y'
                                    );
                            `
                            console.log(insPopulation_transport)
                            con.query({sql:insPopulation_transport},(err, result) => {
                                if (err) throw err;
                                console.log("population_transport table 1 record inserted");
                            });

                            //population_work
                            var insPopulation_works = 
                            `
                                INSERT INTO 
                                    population_works
                                    (
                                            works_type
                                        ,   population_running
                                        ,   cr_by
                                        ,   cr_date
                                        ,   ACTIVE
                                    )
                                VALUES
                                    (
                                            '${works_type}'
                                        ,   '${sub_result[0]['population_running']}'
                                        ,   '${username}'
                                        ,   NOW()
                                        ,   'Y'
                                    );
                            `
                            console.log(insPopulation_works)
                            con.query({sql:insPopulation_works},(err, result) => {
                                if (err) throw err;
                                console.log("population_works table 1 record inserted");
                            });  

                            //query population_works
                            var qryWorks = `
                            SELECT 
                                    works_id
                                ,   works_type
                            FROM
                                population_works
                            WHERE
                                population_running = '${sub_result[0]['population_running']}'
                            AND
                                ACTIVE = 'Y'
                            ORDER BY works_id DESC;  
                            `
                            console.log(qryWorks)
                            con.query({sql: qryWorks}, (works_error, works_result, works_fields) => {
                                var works_chk = works_result[0]
                                console.log("worksId query record = " + JSON.stringify(works_chk));
                                if (typeof works_chk != "undefined") {
                                    if(works_result[0]['works_type'] == '1'){
                                        //query population_job_agriculture
                                        var qryAgri = `
                                                        SELECT agri_id,works_id
                                                        FROM population_job_agriculture 
                                                        WHERE works_id = '${works_result[0]['works_id']}'
                                                        AND ACTIVE = 'Y'
                                                        ORDER BY agri_id DESC;  
                                                        `
                                        console.log(qryAgri)
                                        con.query({sql: qryAgri}, (subworks_error, subworks_result, subworks_fields) => {
                                            var subworks_chk = subworks_result[0]
                                            console.log("population_job_agriculture query record = " + JSON.stringify(subworks_chk));
                                            if (typeof subworks_chk != "undefined") {
                                                if(agricheck == '1'){
                                                    //update population_job_agriculture
                                                    var updPopulation_job_agriculture = 
                                                    `
                                                        UPDATE population_job_agriculture
                                                        SET
                                                                
                                                                agri1 = '${agri1}'
                                                            ,   agri2 = '${agri2}'
                                                            ,   agri3 = '${agri3}'
                                                            ,   agri4 = '${agri4}'
                                                            ,   agri5 = '${agri5}'
                                                            ,   agri6 = '${agri6}'
                                                            ,   agri7 = '${agri7}'
                                                            ,   agri8 = '${agri8}'
                                                            ,   agri_another = '${agri_another}'
                                                            ,   upd_by = '${username}'
                                                            ,   upd_date = NOW()
                                                            ,   ACTIVE = 'Y'
                                                        WHERE agri_id = '${subworks_result[0]['agri_id']}'
                                                    `
                                                    console.log(updPopulation_job_agriculture)
                                                    con.query({sql:updPopulation_job_agriculture},(err, result) => {
                                                        if (err) throw err;
                                                        console.log("population_job_agriculture table " + result.affectedRows + " record updated");
                                                    });
                                                }else{
                                                    //population_job_agriculture
                                                    var delPopulation_job_agriculture = 
                                                    `
                                                    DELETE TABLE population_job_agriculture
                                                    WHERE works_id = "${subworks_result[0]['works_id']}"
                                                    `
                                                    console.log(delPopulation_job_agriculture)
                                                    con.query({sql:delPopulation_job_agriculture}, function (err, result) {
                                                        if (err) throw err;
                                                        console.log("population_job_agriculture table " + result.affectedRows + " record(s) deleted");
                                                    });
                                                }

                                            }else{
                                                //insert population_job_agriculture
                                                var insPopulation_job_agriculture = 
                                                `
                                                    INSERT INTO 
                                                        population_job_agriculture
                                                        (
                                                                works_id
                                                            ,   agri1
                                                            ,   agri2
                                                            ,   agri3
                                                            ,   agri4
                                                            ,   agri5
                                                            ,   agri6
                                                            ,   agri7
                                                            ,   agri8
                                                            ,   agri_another
                                                            ,   cr_by
                                                            ,   cr_date
                                                            ,   ACTIVE
                                                        )
                                                    VALUES
                                                        (
                                                                '${works_result[0]['works_id']}'
                                                            ,   '${agri1}'
                                                            ,   '${agri2}'
                                                            ,   '${agri3}'
                                                            ,   '${agri4}'
                                                            ,   '${agri5}'
                                                            ,   '${agri6}'
                                                            ,   '${agri7}'
                                                            ,   '${agri8}'
                                                            ,   '${agri_another}'
                                                            ,   '${username}'
                                                            ,   NOW()
                                                            ,   'Y'
                                                        );
                                                `
                                                console.log(insPopulation_job_agriculture)
                                                con.query({sql:insPopulation_job_agriculture},(err, result) => {
                                                    if (err) throw err;
                                                    console.log("population_job_agriculture table 1 record inserted");
                                                });
                                            }
                                            console.log(subworks_error);
                                        })

                                        //query population_job_private
                                        var qryPrivate = `
                                                        SELECT private_id ,works_id
                                                        FROM population_job_private 
                                                        WHERE works_id = '${works_result[0]['works_id']}'
                                                        AND ACTIVE = 'Y'
                                                        ORDER BY private_id DESC;  
                                                        `
                                        console.log(qryPrivate)
                                        con.query({sql: qryPrivate}, (subworks_error, subworks_result, subworks_fields) => {
                                            var subworks_chk = subworks_result[0]
                                            console.log("population_job_private query record = " + JSON.stringify(subworks_chk));
                                            if (typeof subworks_chk != "undefined") {
                                                if(privatecheck == '1'){
                                                    //update population_job_private
                                                    var updPopulation_job_private = 
                                                    `
                                                        UPDATE population_job_private
                                                        SET
                                                                
                                                                private1 = '${private1}'
                                                            ,   private2 = '${private2}'
                                                            ,   private3 = '${private3}'
                                                            ,   private4 = '${private4}'
                                                            ,   private5 = '${private5}'
                                                            ,   private6 = '${private6}'
                                                            ,   private7 = '${private7}'
                                                            ,   private_another = '${private_another}'
                                                            ,   upd_by = '${username}'
                                                            ,   upd_date = NOW()
                                                            ,   ACTIVE = 'Y'
                                                        WHERE private_id = '${subworks_result[0]['private_id']}'
                                                    `
                                                    console.log(updPopulation_job_private)
                                                    con.query({sql:updPopulation_job_private},(err, result) => {
                                                        if (err) throw err;
                                                        console.log("population_job_private table " + result.affectedRows + " record updated");
                                                    });
                                                }else{
                                                    //population_job_private
                                                    var delPopulation_job_private = 
                                                    `
                                                    DELETE TABLE population_job_private
                                                    WHERE works_id = "${subworks_result[0]['works_id']}"
                                                    `
                                                    console.log(delPopulation_job_private)
                                                    con.query({sql:delPopulation_job_private}, function (err, result) {
                                                        if (err) throw err;

                                                        console.log("population_job_private table " + result.affectedRows + " record(s) deleted");
                                                    });
                                                }
                                            }else{
                                                //insert population_job_private
                                                var insPopulation_job_private = 
                                                `
                                                    INSERT INTO 
                                                        population_job_private
                                                        (
                                                                works_id
                                                            ,   private1
                                                            ,   private2
                                                            ,   private3
                                                            ,   private4
                                                            ,   private5
                                                            ,   private6
                                                            ,   private7
                                                            ,   private_another
                                                            ,   cr_by
                                                            ,   cr_date
                                                            ,   ACTIVE
                                                        )
                                                    VALUES
                                                        (
                                                                '${works_result[0]['works_id']}'
                                                            ,   '${private1}'
                                                            ,   '${private2}'
                                                            ,   '${private3}'
                                                            ,   '${private4}'
                                                            ,   '${private5}'
                                                            ,   '${private6}'
                                                            ,   '${private7}'
                                                            ,   '${private_another}'
                                                            ,   '${username}'
                                                            ,   NOW()
                                                            ,   'Y'
                                                        );
                                                `
                                                console.log(insPopulation_job_private)
                                                con.query({sql:insPopulation_job_private},(err, result) => {
                                                    if (err) throw err;
                                                    console.log("population_job_private table 1 record inserted");
                                                });
                                            }
                                            console.log(subworks_error);
                                        })

                                        //query population_job_animal
                                        var qryAnimal = `
                                                        SELECT animal_id ,works_id
                                                        FROM population_job_animal 
                                                        WHERE works_id = '${works_result[0]['works_id']}'
                                                        AND ACTIVE = 'Y'
                                                        ORDER BY animal_id DESC;  
                                                        `
                                        console.log(qryAnimal)
                                        con.query({sql: qryAnimal}, (subworks_error, subworks_result, subworks_fields) => {
                                            var subworks_chk = subworks_result[0]
                                            console.log("population_job_animal query record = " + JSON.stringify(subworks_chk));
                                            if (typeof subworks_chk != "undefined") {
                                                if(animalcheck == '1'){
                                                    //update population_job_animal
                                                    var updPopulation_job_animal = 
                                                    `
                                                        UPDATE population_job_animal
                                                        SET
                                                                
                                                                animal1 = '${animal1}'
                                                            ,   animal2 = '${animal2}'
                                                            ,   animal3 = '${animal3}'
                                                            ,   animal4 = '${animal4}'
                                                            ,   animal5 = '${animal5}'
                                                            ,   animal6 = '${animal6}'
                                                            ,   animal7 = '${animal7}'
                                                            ,   animal_another = '${animal_another}'
                                                            ,   upd_by = '${username}'
                                                            ,   upd_date = NOW()
                                                            ,   ACTIVE = 'Y'
                                                        WHERE animal_id = '${subworks_result[0]['animal_id']}'
                                                    `
                                                    console.log(updPopulation_job_animal)
                                                    con.query({sql:updPopulation_job_animal},(err, result) => {
                                                        if (err) throw err;
                                                        console.log("population_job_animal " + result.affectedRows + " record updated");
                                                    });
                                                }else{
                                                    //population_job_animal
                                                    var delPopulation_job_animal = 
                                                    `
                                                    DELETE TABLE population_job_animal
                                                    WHERE works_id = "${subworks_result[0]['works_id']}"
                                                    `
                                                    console.log(delPopulation_job_animal)
                                                    con.query({sql:delPopulation_job_animal}, function (err, result) {
                                                        if (err) throw err;
                                                        console.log("population_job_animal table " + result.affectedRows + " record(s) deleted");
                                                    });
                                                }
                                            }else{
                                                //insert population_job_animal
                                                var insPopulation_job_animal = 
                                                `
                                                    INSERT INTO 
                                                        population_job_animal
                                                        (
                                                                works_id
                                                            ,   animal1
                                                            ,   animal2
                                                            ,   animal3
                                                            ,   animal4
                                                            ,   animal5
                                                            ,   animal6
                                                            ,   animal7
                                                            ,   animal8
                                                            ,   animal9
                                                            ,   animal_another
                                                            ,   cr_by
                                                            ,   cr_date
                                                            ,   ACTIVE
                                                        )
                                                    VALUES
                                                        (
                                                                '${works_result[0]['works_id']}'
                                                            ,   '${animal1}'
                                                            ,   '${animal2}'
                                                            ,   '${animal3}'
                                                            ,   '${animal4}'
                                                            ,   '${animal5}'
                                                            ,   '${animal6}'
                                                            ,   '${animal7}'
                                                            ,   '${animal8}'
                                                            ,   '${animal9}'
                                                            ,   '${animal_another}'
                                                            ,   '${username}'
                                                            ,   NOW()
                                                            ,   'Y'
                                                        );
                                                `
                                                console.log(insPopulation_job_animal)
                                                con.query({sql:insPopulation_job_animal},(err, result) => {
                                                    if (err) throw err;
                                                    console.log("population_job_animal table 1 record inserted");
                                                });
                                            }
                                            console.log(subworks_error);
                                        })

                                        //query population_job_govern
                                        var qryGovern = `
                                                    SELECT govern_id ,works_id
                                                    FROM population_job_govern 
                                                    WHERE works_id = '${works_result[0]['works_id']}'
                                                    AND ACTIVE = 'Y'
                                                    ORDER BY govern_id DESC;  
                                                    `
                                        console.log(qryGovern)
                                        con.query({sql: qryGovern}, (subworks_error, subworks_result, subworks_fields) => {
                                            var subworks_chk = subworks_result[0]
                                            console.log("population_job_govern query record = " + JSON.stringify(subworks_chk));
                                            if (typeof subworks_chk != "undefined") {
                                                if(governcheck == '1'){
                                                    //update population_job_govern
                                                    var updPopulation_job_govern = 
                                                    `
                                                        UPDATE population_job_private
                                                        SET
                                                                
                                                                govern1 = '${govern1}'
                                                            ,   govern2 = '${govern2}'
                                                            ,   govern3 = '${govern3}'
                                                            ,   govern4 = '${govern4}'
                                                            ,   govern_another = '${govern_another}'
                                                            ,   upd_by = '${username}'
                                                            ,   upd_date = NOW()
                                                            ,   ACTIVE = 'Y'
                                                        WHERE govern_id = '${subworks_result[0]['govern_id']}'
                                                    `
                                                    console.log(updPopulation_job_govern)
                                                    con.query({sql:updPopulation_job_govern},(err, result) => {
                                                        if (err) throw err;
                                                        console.log("population_job_govern table " + result.affectedRows + " record updated");
                                                        res.json({
                                                            status: "ok"
                                                        })
                                                    });
                                                }else{
                                                    //population_job_govern
                                                    var delPopulation_job_govern = 
                                                    `
                                                    DELETE TABLE population_job_govern
                                                    WHERE works_id = "${subworks_result[0]['works_id']}"
                                                    `
                                                    console.log(delPopulation_job_govern)
                                                    con.query({sql:delPopulation_job_govern}, function (err, result) {
                                                        if (err) throw err;
                                                        console.log("population_job_govern table " + result.affectedRows + " record(s) deleted");
                                                        res.json({
                                                            status: "ok"
                                                        })
                                                    });
                                                }
                                            }else{
                                                //insert population_job_govern
                                                var insPopulation_job_govern = 
                                                `
                                                    INSERT INTO 
                                                        population_job_govern
                                                        (
                                                                works_id
                                                            ,   govern1
                                                            ,   govern1
                                                            ,   govern3
                                                            ,   govern4
                                                            ,   govern_another
                                                            ,   cr_by
                                                            ,   cr_date
                                                            ,   ACTIVE
                                                        )
                                                    VALUES
                                                        (
                                                                '${works_result[0]['works_id']}'
                                                            ,   '${govern1}'
                                                            ,   '${govern2}'
                                                            ,   '${govern3}'
                                                            ,   '${govern4}'
                                                            ,   '${govern_another}'
                                                            ,   '${username}'
                                                            ,   NOW()
                                                            ,   'Y'
                                                        );
                                                `
                                                console.log(insPopulation_job_govern)
                                                con.query({sql:insPopulation_job_govern},(err, result) => {
                                                    if (err) throw err;
                                                    console.log("population_job_govern table 1 record inserted");
                                                    res.json({
                                                        status: "ok"
                                                    })
                                                });
                                            }
                                            console.log(subworks_error);
                                        })
                                    }else{
                                        console.log(works_result[0]['works_id'])
                                        //population_job_agriculture
                                        var delPopulation_job_agriculture = 
                                        `
                                        DELETE FROM population_job_agriculture
                                        WHERE works_id = "${works_result[0]['works_id']}"
                                        `
                                        console.log(delPopulation_job_agriculture)
                                        con.query({sql:delPopulation_job_agriculture}, function (err, result) {
                                            if (err) throw err;
                                            console.log("population_job_agriculture table " + result.affectedRows + " record(s) deleted");
                                        });

                                        //population_job_animal
                                        var delPopulation_job_animal = 
                                        `
                                        DELETE FROM population_job_animal
                                        WHERE works_id = "${works_result[0]['works_id']}"
                                        `
                                        console.log(delPopulation_job_animal)
                                        con.query({sql:delPopulation_job_animal}, function (err, result) {
                                            if (err) throw err;
                                            console.log("population_job_animal table " + result.affectedRows + " record(s) deleted");
                                        });

                                        //population_job_govern
                                        var delPopulation_job_govern = 
                                        `
                                        DELETE FROM population_job_govern
                                        WHERE works_id = "${works_result[0]['works_id']}"
                                        `
                                        console.log(delPopulation_job_govern)
                                        con.query({sql:delPopulation_job_govern}, function (err, result) {
                                            if (err) throw err;
                                            console.log("population_job_govern table " + result.affectedRows + " record(s) deleted");
                                        });

                                        //population_job_private
                                        var delPopulation_job_private = 
                                        `
                                        DELETE FROM population_job_private
                                        WHERE works_id = "${works_result[0]['works_id']}"
                                        `
                                        console.log(delPopulation_job_private)
                                        con.query({sql:delPopulation_job_private}, function (err, result) {
                                            if (err) throw err;
                                            res.json({
                                                status: "ok"
                                            })
                                            console.log("population_job_private table " + result.affectedRows + " record(s) deleted");
                                        });
                                    }
                                }
                                console.log(works_error);
                            })
                        }else{
                            status: "Request Body Access Denied"
                        }   
                    console.log(sub_error)
                    })
                }
            })

            if(regisdate){
                var insVehicle = 
                        `
                        INSERT INTO population_asset_vehicle
                            (
                                population_idcard
                                ,   regisdate
                                ,   vtype_id
                                ,   vehicle_rent
                                ,   distributer
                                ,   cr_by
                                ,   cr_date
                                ,   ACTIVE
                            )
                        VALUES
                            (
                                "${population_idcard}"
                                ,   "${regisdate}"
                                ,   "${vtype_id}"
                                ,   "${vehicle_rent}"
                                ,   "${distributer}"
                                ,   "${username}"
                                ,   NOW()
                                ,   "Y"
                            );
                        `
                console.log(insVehicle)
                con.query({sql:insVehicle},(err, result) => {
                    if (err) throw err;
                    console.log("population_asset_vehicle table 1 record inserted");
                    res.json({
                        status_vehicle: "ok"
                    })
                });
            }

            if(pet_regis){
                var insPet = 
                        `
                        INSERT INTO population_asset_pet
                            (
                                population_idcard
                                ,   pet_regis
                                ,   pet_amount
                                ,   ptype_id
                                ,   pet_sex
                                ,   vaccine
                                ,   vaccine_during
                                ,   vaccine_lastest
                                ,   pet_newborn
                                ,   pet_newborn_number
                                ,   distributor
                                ,   cr_by
                                ,   cr_date
                                ,   ACTIVE
                            )
                        VALUES
                            (
                                "${population_idcard}"
                                ,   "${pet_regis}"
                                ,   "${pet_amount}"
                                ,   "${ptype_id}"
                                ,   "${pet_sex}"
                                ,   "${vaccine}"
                                ,   "${vaccine_during}"
                                ,   "${vaccine_lastest}"
                                ,   "${pet_newborn}"
                                ,   "${pet_newborn_number}"
                                ,   "${distributor}"
                                ,   "${username}"
                                ,   NOW()
                                ,   "Y"
                            );
                        `
                console.log(insPet)
                con.query({sql:insPet},(err, result) => {
                    if (err) throw err;
                    console.log("population_asset_pet table 1 record inserted");
                    res.json({
                        status_pet: "ok"
                    })
                });
            }


            if(animal_regis){
                var insAnimal = 
                        `
                        INSERT INTO population_asset_animal
                            (
                                population_idcard
                                ,   animal_regis
                                ,   animal_amount
                                ,   atype_id
                                ,   infection
                                ,   infection_detail
                                ,   shelter
                                ,   diseasecontrol
                                ,   diseasecontrol_by
                                ,   disease_shelter
                                ,   market
                                ,   market_place
                                ,   distributor
                                ,   cr_by
                                ,   cr_date
                                ,   ACTIVE
                            )
                        VALUES
                            (
                                "${population_idcard}"
                                ,   "${animal_regis}"
                                ,   "${animal_amount}"
                                ,   "${atype_id}"
                                ,   "${infection}"
                                ,   "${infection_detail}"
                                ,   "${shelter}"
                                ,   "${diseasecontrol}"
                                ,   "${diseasecontrol_by}"
                                ,   "${disease_shelter}"
                                ,   "${market}"
                                ,   "${market_place}"
                                ,   "${distributor}"
                                ,   "${username}"
                                ,   NOW()
                                ,   "Y"
                            );
                        `
                console.log(insAnimal)
                con.query({sql:insAnimal},(err, result) => {
                    if (err) throw err;
                    console.log("population_asset_animal table 1 record inserted");
                    res.json({
                        status_animal: "ok"
                    })
                });
            }


            if(system_id){
                var insLand = 
                        `
                        INSERT INTO population_asset_land
                            (
                                population_idcard
                                ,   system_id
                                ,   dimen1
                                ,   dimen2
                                ,   dimen3
                                ,   land_benefit
                                ,   land_location
                                ,   land_tax
                                ,   land_rent
                                ,   distributor
                                ,   cr_by
                                ,   cr_date
                                ,   ACTIVE
                            )
                        VALUES
                            (
                                "${population_idcard}"
                                ,   "${system_id}"
                                ,   "${dimen1}"
                                ,   "${dimen2}"
                                ,   "${dimen3}"
                                ,   "${land_benefit}"
                                ,   "${land_location}"
                                ,   "${land_tax}"
                                ,   "${land_rent}"
                                ,   "${distributor}"
                                ,   "${username}"
                                ,   NOW()
                                ,   "Y"
                            );
                        `
                console.log(insLand)
                con.query({sql:insLand},(err, result) => {
                    if (err) throw err;
                    console.log("population_asset_land table 1 record inserted");
                    res.json({
                        status_land: "ok"
                    })
                });
            }


        } else {
            res.json({
                status: "Request Body Access Denied"
            })
        }
    } catch (error) {
        res.json({ status: "Catch Error Access Denied" });
    }
});

module.exports = router;
