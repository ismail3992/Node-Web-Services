var express = require('express');
var pm2 = require('pm2');
var expressValidator = require('express-validator');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var ResponseHandler = require('./app/handlers/ResponseHandler');
var EmailUtil  = require('./app/utils/EmailUtils');
var emailUtils = new EmailUtil()
var emailTemplates = require('./app/constants/EMAILnotify');






//Import Routes
var User = require('./app/routes/User');

console.log("process.env.NODE_ENV ******************",process.env.NODE_ENV )



// if(process.env.NODE_ENV == 'alpha' || process.env.NODE_ENV == 'production' ){
//   pm2.connect(function (err) {

//   if (err) {
//     console.error(err);
//     process.exit(2);
//   }
//   pm2.launchBus(function (err, bus) {

//     bus.on('log:err', function (er) {
//       var message = 'Hello <sup>Tm</sup>,<br><br><b><u><i>Error Noticed:</i></u></b><br>'+'<b><p style="color:red;">'+er.data+'</p></b>';
//       var emails = emailTemplates.error_Mail.emails;
//       var subject = emailTemplates.error_Mail.subject;
//       EmailUtil.sendEmails(emails,subject,message,function (err, status) {
//         if (status) {
//           console.log("Email Sent")
//          } else {
//            console.log("Email Failed to send")
//          }
//         })
      
//     })
//   })
// })
// }


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//Global MiddleWare 
app.use(function (req, res, next) {
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, X-Powered-By, Content-Length, Connection');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

//Register API 
app.use('/user', User)
app.use('/',function(req,res){
  var result = {
    message:"Response from Api Connect DB to test other api's"
  }
    res.send(result)

})



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  ResponseHandler.handleResourceNotFound(res);
});

// error handlers
app.use(function (err, req, res, next) {
  console.error(err);
  ResponseHandler.handleServerError(res);
});


module.exports = app;