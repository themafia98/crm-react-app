import  {Response, Application} from 'express';
import fs from 'fs';
import path from 'path';
import {RequestParam} from '../configs/interface';

import {errorSender} from '../Utils/mainUtils';
import {log} from '../logger/logModule';

export default (app:Application) => {

    app.get('/policy', (req: RequestParam, res:Response):void => {
        
        res.setHeader('Access-Control-Allow-Origin',app.locals.frontend.origin);

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
