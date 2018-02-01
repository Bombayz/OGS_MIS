var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var tr14 = require('../../qry_tr14byall.json');

// var con = mysql.createConnection({
//     /* host: "localhost",
//     user: "root",
//     password: "",
//     database: "onegeosoft" */
//     host: "203.154.82.62",
//     user: "user",
//     password: "!Ogs1234",
//     database: "mis"
// });
// var coreF = require('../coreF');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json(tr14)
});

module.exports = router;
