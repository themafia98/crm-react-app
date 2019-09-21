import  {Response, Application} from 'express';
import fs from 'fs';
import path from 'path';
import {RequestParam} from '../configs/interface';

import {WHITELIST} from '../utils/const';
import {errorSender} from '../utils/mainUtils';
import {log} from '../logger/logModule';

export default (app:Application) => {

    app.get('/policy', (req: RequestParam, res:Response):void => {
        
        if (process.env.NODE_ENV !== 'production')
        res.setHeader('Access-Control-Allow-Origin',WHITELIST[0]);
        else res.setHeader('Access-Control-Allow-Origin',WHITELIST[WHITELIST.length-1]);

          const policy = fs.createReadStream(path.join(__dirname, '../data','policy.txt'));
      
          policy.on('open', () => {
            res.setHeader('Content-Type','text/html; charset=utf-8');
            policy.pipe(res)
          });
          policy.on('error', (error:Error) => {
          log.error(error.message);
          errorSender(res, 404);
          });
      });
};
