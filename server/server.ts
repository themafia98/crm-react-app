
import express, {Application, Request, Response, NextFunction} from 'express';
import logger from 'morgan';
import cors from 'cors';
import envfile from 'envfile';
import multer from 'multer';

import namespaceMail from './api/Mail';


export const app:Application = express();

const port:string = process.env.PORT || '3001';

app.use(logger('dev'));
app.use(cors({
    origin: 'http://localhost:3000/'
  }));
app.set('port', port);

const upload = multer();
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

app.post('/sendMail',upload.none(), (req:Request,res:Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!req.body) return res.sendStatus(400);
    const data = req.body;
    console.log(data.email);
    sender.createMailOptions(data.email,data.number, env.GMAIL_USER, 'Перезвонить');
    sender.sendMail();
    res.sendStatus(200);
});


app.get('/',(req:Request, res:Response, next: NextFunction) => {

    res.send('Start ts server');
});

app.listen(port,() => console.log(`Server listen on ${port}`));

