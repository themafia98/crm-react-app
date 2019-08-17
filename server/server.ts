
import express, {Application, Request, Response, NextFunction} from 'express';
import http from 'http';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import {SendMailOptions} from 'nodemailer';
import {transOptions} from './types';
import fs from 'fs';
import envfile from 'envfile';

import namespaceMail from './api/Mail';

export const app:Application = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port:string = process.env.PORT || '3001';
const server = http.createServer(app);

app.set('port', port);

const env = envfile.parseFileSync('.env');
const sender = new namespaceMail.Sender({
    service: 'gmail',
    auth: {
           user: env.GMAIL_USER,
           pass: env.GMAIL_PASSWORD
       }
});


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

    sender.createMailOptions('test@test.test', env.GMAIL_USER, 'test request');
    sender.sendMail();
  res.sendStatus(200);
});


app.get('/',(req:Request, res:Response, next: NextFunction) => {

    res.send('Start ts server');
});

app.listen(port,() => console.log(`Server listen on ${port}`));

