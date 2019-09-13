import  {Response, NextFunction, Application} from 'express';
import fs,{ReadStream} from 'fs';
import path from 'path';
import {RequestParam} from '../configs/interface';

import {errorSender} from '../Utils/mainUtils';
import {log} from '../logger/logModule';

export default (app:Application) => {

  app.param('serviceType', (req:RequestParam, res: Response, next: NextFunction, serviceType:string):void => {
    req.serviceType = serviceType;
    next();
  });

  app.get('/services/:serviceType',(req: RequestParam, res:Response):void => {
    
    let service:null|ReadStream = null;
    res.setHeader('Access-Control-Allow-Origin',app.locals.frontend.origin);
      if (!req.serviceType){ return void errorSender(res, 404); };

      if (req.serviceType === 'auto')
      service = fs.createReadStream(path.join(__dirname, '../data','autoAbout.txt'));
      else if (req.serviceType === 'amoCRM')
      service = fs.createReadStream(path.join(__dirname, '../data','amoCRMAbout.txt'));
      else if (req.serviceType === 'retailCRM')
      service = fs.createReadStream(path.join(__dirname, '../data','retailCRMAbout.txt'));
      else  return void errorSender(res, 404);

      service.on('open', () => {
        res.setHeader('Content-Type','text/html; charset=utf-8');
        service.pipe(res)
      });
      service.on('error', (error:Error) => {
        log.error(error.message);
        errorSender(res, 404);
      });
  });
};
