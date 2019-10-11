import  {Response, NextFunction, Application} from 'express';
import fs,{ReadStream} from 'fs';
import path from 'path';
import {RequestParam} from '../../types/interface';

import {WHITELIST} from '../../utils/const';
import {errorSender} from '../../utils/mainUtils';
import {log} from '../../logger/logModule';

export default (app:Application) => {

  app.param('serviceType', (req:RequestParam, res:Response, next: NextFunction, serviceType:string):void => {
    req.serviceType = serviceType;
    next();
  });

  app.get('/services/:serviceType',(req: RequestParam, res:Response):void => {
    
    let service:null|ReadStream = null;
    try {
        if (process.env.NODE_ENV !== 'production')
        res.setHeader('Access-Control-Allow-Origin',WHITELIST[0]);
        else res.setHeader('Access-Control-Allow-Origin',WHITELIST[WHITELIST.length-1]);

          if (!req.serviceType){ return void errorSender(res, 404); };

          if (req.serviceType === 'auto')
          service = fs.createReadStream(path.join(__dirname, '../../data','autoAbout.txt'));
          else if (req.serviceType === 'amoCRM')
          service = fs.createReadStream(path.join(__dirname, '../../data','amoCRMAbout.txt'));
          else if (req.serviceType === 'retailCRM')
          service = fs.createReadStream(path.join(__dirname, '../../data','retailCRMAbout.txt'));
          else  return void errorSender(res, 404);

          service.on('open', () => {
            res.setHeader('Content-Type','text/plain; charset=utf-8');
            service.pipe(res);
          });
          service.on('error', (error:Error) => {
            log.error(error.message);
            errorSender(res, 404);
              });
      } catch(err){
        log.error(err.message);
        return void errorSender(res, 404);
      }
  });
};
