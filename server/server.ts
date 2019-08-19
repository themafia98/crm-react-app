
import express, {Application, Request, Response, NextFunction} from 'express';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import namespacelogger from './logger/logger';
import cors from 'cors';
import envfile from 'envfile';
import multer from 'multer';
import {formData} from './configs/types';
import {RequestParam} from './configs/interface';
import namespaceMail from './api/Mail';


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const debug = namespacelogger.loggerDebug();
const log = namespacelogger.loggerError();
export const app:Application = express();


if(process.env.NODE_ENV === 'production')
app.locals.frontend = 'https://themafia98.github.io';
else app.locals.frontend = 'http://localhost:3000';

const port:string = process.env.PORT || '3001';


const corsOptions = {
    origin: function (origin:string, callback:(error:object, result?:boolean) => void) {
        if (app.locals.frontend === origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// app.use(cors({
//     origin: app.locals.frontend
// }));
app.use(limiter);
app.disable('x-powered-by');

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
  const today = new Date();
  const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  log.error(`${res.locals.message} / ${day}/${time}`);
  // render the error page
  res.sendStatus(503);
});


app.param('type', (req:RequestParam, res: Response, next: NextFunction, type:string):void => {
  req.type = type;
  next();
});

app.post('/mail/:type',upload.none(), (req:RequestParam,res:Response):void|object => {
    const {type} = req;

    const isForm:boolean|string = req.is('multipart/form-data');
    res.setHeader('Access-Control-Allow-Origin',app.locals.frontend);

    if (!isForm) return res.sendStatus(400).send('Bad request format');

    if  (isForm && type === 'sendMailConsultation'){

      const isEmpty:boolean = !req.body.email && !req.body.name && !req.body.number;
      if (isEmpty) return res.sendStatus(400).send('Form is empty');

      const data:formData = req.body;
      console.log(data);

      sender.createMailOptions(data.email,data.name, data.number, env.GMAIL_USER, 'Консультация');
      
      const today = new Date();
      const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      debug.info(`Start send requset mail from ${data.email} to ${env.GMAIL_USER} /${day}/${time}`);

      sender.sendMail().then(resPromise => {
        debug.info('Send Mail status: ' + resPromise);
        if (resPromise)
        res.sendStatus(200);
        else res.sendStatus(400);
      })
      .catch(error => log.error(error.message + ` / ${Date.now()}`));

    } else if (isForm && type === 'sendMailQuestion'){

      const isEmpty = !req.body.email && !req.body.name && !req.body.number && !req.body.text;
      if (isEmpty) return res.sendStatus(400).send('Form is empty');
      
      const data:formData = req.body;
      console.log(data);

      sender.createFeedBackMailOptions(data.email,data.name,data.text, 
                                      data.number, env.GMAIL_USER, 'Вопрос от клиента');
      
      const today = new Date();
      const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                                
      debug.info(`Start send feedback mail from ${data.email} to ${env.GMAIL_USER} /${day}/${time}`);  

      sender.sendMail().then(resPromise => {
        debug.info('Send Mail status: ' + resPromise);
        if (resPromise)
        res.sendStatus(200);
        else res.sendStatus(400);
      });
    } else res.sendStatus(400).send('form-data invalid');;
});


app.get('/policy', (req: RequestParam, res:Response, next: NextFunction):void => {
  
  res.setHeader('Access-Control-Allow-Origin',app.locals.frontend);
  try {
  fs.readFile('./data/policy.txt','utf-8', (err, data) => {
    if (err) throw err;
    res.status(200).send(JSON.stringify(data));
  })
  } catch(error){
    log.error(error.message);
    res.status(400).send(error.message);
  };

});

app.get('*',(req:Request, res:Response) => {
  res.redirect(app.locals.frontend);
});


app.listen(port,() => {

    const today = new Date();
    const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    console.log(`Server listen on ${port} with origin ${app.locals.frontend}`);
    debug.info(`Server ${app.get('port')} start in ${day}/${time} with origin ${app.locals.frontend}`);

});

