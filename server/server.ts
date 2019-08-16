
let debug = require('debug')('server:server');
let http = require('http');
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');



const Mail = require('./api/Mail');
const sender = new Mail();

let app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let port:string = process.env.PORT || '3001';
app.set('port', port);

let server = http.createServer(app);


// error handler
app.use(function(err:any, req:any, res:any, next:any):void {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.get('/sendMail', (req,res) => {

  res.send('GET handler for /sendMail route.');
});


server.listen(port, ():void => {
  console.log(`Server listen on ${port}`);
});
module.exports = app;
