
import express, {Application, Request, Response, NextFunction} from 'express';
import http from 'http';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';

import fs from 'fs';
import nodemailder from 'nodemailer';
import envfile from 'envfile';

export const app:Application = express();
envfile.parseFileSync('.env');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port:string = process.env.PORT || '3001';
const server = http.createServer(app);

app.set('port', port);


// // error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction):void {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.get('/sendMail', (req:Request,res:Response) => {

//   sender.createSender().sendMail();
  res.send('GET handler for /sendMail route.');
});


app.get('/',(req:Request, res:Response, next: NextFunction) => {

    res.send('Start ts server');
});

app.listen(port,() => console.log(`Server listen on ${port}`));

