var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var chklogin = require('./routes/post/chklogin');
var insertopt = require('./routes/post/insertopt');
var insertvilage = require('./routes/post/insertvilage');
var qryoptdata = require('./routes/post/qryoptdata');
var deletevilage = require('./routes/post/deletevilage');
var opt_qrytable = require('./routes/get/opt_qrytable');
var survey_tr14table = require('./routes/post/survey_tr14table');
var qry_vilagename = require('./routes/post/qry_vilagename');
var qry_houseno = require('./routes/post/qry_houseno');
var tr14_qrydatahouse = require('./routes/post/tr14_qrydatahouse');
var tr14_qrypopulationtable = require('./routes/get/tr14_qrypopulationtable');
var qry_tr14byhouseno = require('./routes/get/qry_tr14byhouseno');
var qry_tr14byname = require('./routes/get/qry_tr14byname');
var qry_tr14byall = require('./routes/get/qry_tr14byall');
var inserthouse = require('./routes/post/inserthouse');
var insertpopulation = require('./routes/post/insertpopulation');
var deletelatpopulation = require('./routes/post/deletelatpopulation');
var insertassetland = require('./routes/post/insertassetland');
var insertassetvehicle = require('./routes/post/insertassetvehicle');
var insertassetpet = require('./routes/post/insertassetpet');
var insertassetanimal = require('./routes/post/insertassetanimal');
var deleteassetland = require('./routes/post/deleteassetland');
var deleteassetvehicle = require('./routes/post/deleteassetvehicle');
var deleteassetpet = require('./routes/post/deleteassetpet');
var deleteassetanimal = require('./routes/post/deleteassetanimal');
var updateassetland = require('./routes/post/updateassetland');
var updateassetpet = require('./routes/post/updateassetpet');
var updateassetvehicle = require('./routes/post/updateassetvehicle');
var updateassetanimal = require('./routes/post/updateassetanimal');
var survey_poptable = require('./routes/post/survey_poptable');
var survey_qryhousedata = require('./routes/post/survey_qryhousedata');
var qry_distributor = require('./routes/post/qry_distributor');
var insertlatentpopulation = require('./routes/post/insertlatentpopulation');
var insertpopulation_mobile = require('./routes/post/insertpopulation_mobile');
//var uploadimg = require('./routes/post/uploadimg');
var survey_qrypopdata = require('./routes/post/survey_qrypopdata');
var survey_qryjobagri  = require('./routes/post/survey_qryjobagri');
var survey_qryjobgovern  = require('./routes/post/survey_qryjobgovern');
var survey_qryjobprivate  = require('./routes/post/survey_qryjobprivate');
var survey_qryjobanimal  = require('./routes/post/survey_qryjobanimal');
var gettr14  = require('./routes/get/gettr14');
var getsurveyhouse  = require('./routes/get/getSurveyHouse');
var survey_assettable = require('./routes/post/survey_assettable');

var getMarker = require('./routes/get/getMarker');



// var qry_tr14all = require('./routes/post/qry_tr14all');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/chklogin',chklogin);
app.use('/insertopt',insertopt);
app.use('/insertvilage',insertvilage);
app.use('/qryoptdata',qryoptdata);
app.use('/opt_qrytable',opt_qrytable);
app.use('/survey_tr14table',survey_tr14table);
app.use('/qry_vilagename',qry_vilagename);
app.use('/qry_houseno',qry_houseno);
app.use('/deletevilage',deletevilage);
app.use('/tr14_qrydatahouse',tr14_qrydatahouse);
app.use('/tr14_qrypopulationtable',tr14_qrypopulationtable);
app.use('/qry_tr14byhouseno',qry_tr14byhouseno);
app.use('/qry_tr14byname',qry_tr14byname);
app.use('/inserthouse',inserthouse);
app.use('/qry_tr14byall',qry_tr14byall);
app.use('/insertpopulation',insertpopulation);
app.use('/deletelatpopulation',deletelatpopulation);
app.use('/insertassetland',insertassetland);
app.use('/insertassetvehicle',insertassetvehicle);
app.use('/insertassetpet',insertassetpet);
app.use('/insertassetanimal',insertassetanimal);
app.use('/deleteassetland',deleteassetland);
app.use('/deleteassetvehicle',deleteassetvehicle);
app.use('/deleteassetpet',deleteassetpet);
app.use('/deleteassetanimal',deleteassetanimal);
app.use('/updateassetland',updateassetland);
app.use('/updateassetpet',updateassetpet);
app.use('/updateassetvehicle',updateassetvehicle);
app.use('/updateassetanimal',updateassetanimal);qry_distributor
app.use('/survey_poptable',survey_poptable);
app.use('/survey_qryhousedata',survey_qryhousedata);
app.use('/qry_distributor',qry_distributor);
app.use('/insertlatentpopulation',insertlatentpopulation);
app.use('/insertpopulation_mobile',insertpopulation_mobile);
//app.use('/uploadimg',uploadimg);
app.use('/survey_qrypopdata',survey_qrypopdata);
app.use('/survey_qryjobagri',survey_qryjobagri);
app.use('/survey_qryjobgovern',survey_qryjobgovern);
app.use('/survey_qryjobprivate',survey_qryjobprivate);
app.use('/survey_qryjobanimal',survey_qryjobanimal);
app.use('/gettr14',qry_tr14byall);
app.use('/survey_assettable',survey_assettable);


app.use('/getMarker',getMarker);


// 
app.use('/getSurveyHouse',getsurveyhouse);



app.use('/qry_tr14all',qry_tr14byall);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;


});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
