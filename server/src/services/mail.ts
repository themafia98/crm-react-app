import {Application, Response, NextFunction} from 'express';
import multer from 'multer';
import {debug, log} from '../logger/logModule';
import {formData} from '../configCode/types';
import {RequestParam} from '../configCode/interface';

import {WHITELIST} from '../utils/const';
import {errorSender} from '../utils/mainUtils';

export default (app:Application):Function|void => {

    const upload = multer(); // form-data

      app.param('type', (req:RequestParam, res: Response, next: NextFunction, type:string) => {
        req.type = type;
        next();
      });
      
      app.post('/mail/:type',upload.none(), (req:RequestParam,res:Response) => {
          const {type} = req;
      
          const isForm:boolean|string = req.is('multipart/form-data');
          if (process.env.NODE_ENV !== 'production')
          res.setHeader('Access-Control-Allow-Origin',WHITELIST[0]);
          else res.setHeader('Access-Control-Allow-Origin',WHITELIST[WHITELIST.length-1]);
      
          if (!isForm) return errorSender(res, 400);
      
          if  (isForm && type === 'sendMailConsultation'){
      
            const isEmpty:boolean = !req.body.email && !req.body.name && !req.body.number;
            if (isEmpty) return errorSender(res, 400);
      
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
              else errorSender(res, 400);
            })
            .catch((error: { message: string; }) => log.error(error.message + ` / ${Date.now()}`));
      
          } else if (isForm && type === 'sendMailQuestion'){
      
            const isEmpty = !req.body.email && !req.body.name && !req.body.number && !req.body.text;
            if (isEmpty) return errorSender(res, 400);
            
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
              else errorSender(res, 400);
            });
          } else errorSender(res, 400);
      });
};