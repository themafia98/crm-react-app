import  {Response, NextFunction, Application} from 'express';
import Database from '../api/DataBase';
import fs,{ReadStream} from 'fs';
import path from 'path';
import {RequestParam} from '../configCode/interface';

import {WHITELIST} from '../utils/const';
import {errorSender} from '../utils/mainUtils';
import {log} from '../logger/logModule';

export default (app:Application) => {

  app.param('priceType', (req:RequestParam, res:Response, next: NextFunction, priceType:string):void => {
    req.priceType = priceType;
    next();
  });

  app.get('/price/cards/:priceType',(req: RequestParam, res:Response):void => {
    
    let service:null|ReadStream = null;

    if (process.env.NODE_ENV !== 'production')
    res.setHeader('Access-Control-Allow-Origin',WHITELIST[0]);
    else res.setHeader('Access-Control-Allow-Origin',WHITELIST[WHITELIST.length-1]);

    if (process.env.NODE_ENV !== 'production')
    res.setHeader('Access-Control-Allow-Origin',WHITELIST[0]);
    else res.setHeader('Access-Control-Allow-Origin',WHITELIST[WHITELIST.length-1]);

      if (!req.priceType){ return void errorSender(res, 403) }
   
        Database.getCards(req.priceType)
        .then(list => {
          if (list && list.length > 0){
            return res.json(list);
          } else return void errorSender(res, 404);
        })
        .catch(err =>  { log.error(err); return void errorSender(res, 404); });
  });
};
