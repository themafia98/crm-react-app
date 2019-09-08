import express,{Application, Request, Response, NextFunction} from 'express';
import Events from 'events';
import multer from 'multer';
import path from 'path';
import fs,{ReadStream} from 'fs';

import {debug, log} from './logger/logModule';
import {formData} from './configs/types';
import {RequestParam} from './configs/interface';


import cors from 'cors';

namespace AppNamespace {

    export const app:Application = express();
    export const eventEmitter = new Events();
    
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
      
            app.locals.sender.createMailOptions(data.email,data.name, data.number, process.env.TOKEN_GMAIL_USER, 'Консультация');
            
            const today = new Date();
            const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      
            debug.info(`Start send requset mail from ${data.email} to ${process.env.TOKEN_GMAIL_USER} /${day}/${time}`);
      
            app.locals.sender.sendMail().then((resPromise: string) => {
              debug.info('Send Mail status: ' + resPromise);
              if (resPromise)
              res.sendStatus(200);
              else res.sendStatus(400);
            })
            .catch((error: { message: string; }) => log.error(error.message + ` / ${Date.now()}`));
      
          } else if (isForm && type === 'sendMailQuestion'){
      
            const isEmpty = !req.body.email && !req.body.name && !req.body.number && !req.body.text;
            if (isEmpty) return res.status(400).send('Form is empty');
            
            const data:formData = req.body;
            console.log(data);
      
            app.locals.sender.createFeedBackMailOptions(data.email,data.name,data.text, 
                                            data.number, process.env.TOKEN_GMAIL_USER, 'Вопрос от клиента');
            
            const today = new Date();
            const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                                      
            debug.info(`Start send feedback mail from ${data.email} to ${process.env.TOKEN_GMAIL_USER} /${day}/${time}`);  
      
            app.locals.sender.sendMail().then((resPromise: string) => {
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
          policy.on('error', (error:Error) => {
          log.error(error.message);
          res.sendStatus(404);
          });
      });

      app.param('serviceType', (req:RequestParam, res: Response, next: NextFunction, serviceType:string):void => {
        req.serviceType = serviceType;
        next();
      });

      app.get('/services/:serviceType', (req: RequestParam, res:Response):void => {
        
        let service:null|ReadStream = null;
        res.setHeader('Access-Control-Allow-Origin',app.locals.frontend.origin);
          if (!req.serviceType){ return void res.sendStatus(404); };

          if (req.serviceType === 'auto')
          service = fs.createReadStream(path.join(__dirname, '/data','autoAbout.txt'));
          else if (req.serviceType === 'amoCRM')
          service = fs.createReadStream(path.join(__dirname, '/data','amoCRMAbout.txt'));
          else if (req.serviceType === 'retailCRM')
          service = fs.createReadStream(path.join(__dirname, '/data','retailCRMAbout.txt'));
          else  return void res.sendStatus(404);

          service.on('open', () => {
            res.setHeader('Content-Type','text/html; charset=utf-8');
            service.pipe(res)
          });
          service.on('error', (error:Error) => {
          log.error(error.message);
          res.sendStatus(404);
          });
      });
      
      app.get('*',(req:Request, res:Response) => {
        res.redirect(app.locals.frontend.origin);
      });
};


export default AppNamespace;
  