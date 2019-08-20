import express,{Application, Request, Response, NextFunction} from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import {debug, log} from './logger/logModule';
import {formData} from './configs/types';
import {RequestParam} from './configs/interface';
import namespaceMail from './api/Mail';
import cors from 'cors';

import token from './data/token.json';

namespace AppNamespace {

    export const app:Application = express();
    app.disable('x-powered-by');
    const corsOptions = {
      origin: function (origin:string, callback:(error:object, result?:boolean) => void) {
          if (app.locals.frontend.origin === origin) {
              callback(null, true)
          } else {
              callback(new Error('Not allowed by CORS'))
          }
      },
      methods: ['GET', 'POST'],
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors(corsOptions));
    const upload = multer(); // form-data

    const sender = new namespaceMail.Sender({
        service: 'gmail',
        auth: {
              user: token.gmail.USER,
              pass: token.gmail.PASSWORD
        }
      });

 
      app.param('type', (req:RequestParam, res: Response, next: NextFunction, type:string):void => {
        req.type = type;
        next();
      });
      
      app.post('/mail/:type',upload.none(), (req:RequestParam,res:Response):void|object => {
          const {type} = req;
      
          const isForm:boolean|string = req.is('multipart/form-data');
          res.setHeader('Access-Control-Allow-Origin',app.locals.frontend.origin);
      
          if (!isForm) return res.status(400).send('Bad request format');
      
          if  (isForm && type === 'sendMailConsultation'){
      
            const isEmpty:boolean = !req.body.email && !req.body.name && !req.body.number;
            if (isEmpty) return res.status(400).send('Form is empty');
      
            const data:formData = req.body;
            console.log(data);
      
            sender.createMailOptions(data.email,data.name, data.number, token.gmail.USER, 'Консультация');
            
            const today = new Date();
            const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      
            debug.info(`Start send requset mail from ${data.email} to ${token.gmail.USER} /${day}/${time}`);
      
            sender.sendMail().then(resPromise => {
              debug.info('Send Mail status: ' + resPromise);
              if (resPromise)
              res.sendStatus(200);
              else res.sendStatus(400);
            })
            .catch(error => log.error(error.message + ` / ${Date.now()}`));
      
          } else if (isForm && type === 'sendMailQuestion'){
      
            const isEmpty = !req.body.email && !req.body.name && !req.body.number && !req.body.text;
            if (isEmpty) return res.status(400).send('Form is empty');
            
            const data:formData = req.body;
            console.log(data);
      
            sender.createFeedBackMailOptions(data.email,data.name,data.text, 
                                            data.number, token.gmail.USER, 'Вопрос от клиента');
            
            const today = new Date();
            const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                                      
            debug.info(`Start send feedback mail from ${data.email} to ${token.gmail.USER} /${day}/${time}`);  
      
            sender.sendMail().then(resPromise => {
              debug.info('Send Mail status: ' + resPromise);
              if (resPromise)
              res.sendStatus(200);
              else res.sendStatus(400);
            });
          } else res.status(400).send('form-data invalid');;
      });
      
      
      app.get('/policy', (req: RequestParam, res:Response):void => {
        
        res.setHeader('Access-Control-Allow-Origin',app.locals.frontend.origin);

          const policy = fs.createReadStream(path.join(__dirname, '/data','policy.txt'));
      
          policy.on('open', () => {
            res.setHeader('Content-Type','text/html; charset=utf-8');
            policy.pipe(res)
          });
          policy.on('error', (error) => {
          log.error(error.message);
          res.sendStatus(404);
          });
      });
      
      app.get('*',(req:Request, res:Response) => {
        res.redirect(app.locals.frontend.origin);
      });
};

export default AppNamespace;
  