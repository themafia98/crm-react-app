
let debug = require('debug')('server:server');
let http = require('http');
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// let usersRouter = require('./routes/users');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let port:string = process.env.PORT || '3001';
app.set('port', port);

let server = http.createServer(app);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req:any, res:any, next:any):void {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any, next:any):void {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function onError(error:any):void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening():void {
  debug('Listening on ' + server.address());
}


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
