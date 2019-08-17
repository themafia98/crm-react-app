
const debug = require('debug')('server:server');
const http = require('http');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const fs = require('fs');
const nodemailder = require('nodemailer');
const envfile = require('envfile');


const NameSpaceMailer = require('./api/Mail');

const sender = new NameSpaceMailer.MailHosting(nodemailder, envfile.parseFileSync('.env'));

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

  sender.createSender().sendMail();
  res.send('GET handler for /sendMail route.');
});


server.listen(port, ():void => {
  console.log(`Server listen on ${port}`);
});
module.exports = app;
