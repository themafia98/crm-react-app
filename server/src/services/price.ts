import  {Response, NextFunction, Application} from 'express';
import fs,{ReadStream} from 'fs';
import path from 'path';
import {RequestParam} from '../configs/interface';

import {errorSender} from '../utils/mainUtils';
import {log} from '../logger/logModule';

export default (app:Application) => {

  app.param('priceType', (req:RequestParam, res:Response, next: NextFunction, priceType:string):void => {
    req.priceType = priceType;
    next();
  });

  app.get('/price/cards/:priceType',(req: RequestParam, res:Response):void => {
    
    let service:null|ReadStream = null;
    res.setHeader('Access-Control-Allow-Origin',app.locals.frontend.origin);
      if (!req.priceType){ return void errorSender(res, 404); };

      if (req.priceType === 'auto')
      service = fs.createReadStream(path.join(__dirname, '../data','CardsAuto.json'));
      else if (req.priceType === 'amoCRM')
      service = fs.createReadStream(path.join(__dirname, '../data','CardsAmoCRM.json'));
      else if (req.serviceType === 'retailCRM')
      service = fs.createReadStream(path.join(__dirname, '../data','CardsRetailCRM.json'));
      else  return void errorSender(res, 404);

      service.on('open', () => {
        res.setHeader('Content-Type','application/json; charset=utf-8');
        service.pipe(res)
      });
      service.on('error', (error:Error) => {
        log.error(error.message);
        errorSender(res, 404);
      });
  });
};
