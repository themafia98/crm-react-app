import  {Response,NextFunction, Application} from 'express';
import fs, { ReadStream } from 'fs';
import path from 'path';
import {RequestParam} from '../../types/interface';

import {WHITELIST} from '../../utils/const';
import {errorSender} from '../../utils/mainUtils';
import {log} from '../../logger/logModule';

export default (app:Application) => {

    app.param('type', (req:RequestParam, res:Response, next: NextFunction, type:string):void => {
        req.type = type;
        next();
      });

    app.get('/api/aboutData/:type', (req: RequestParam, res:Response):void => {
        
        if (!req.type) return void errorSender(res, 400);

        if (process.env.NODE_ENV !== 'production')
        res.setHeader('Access-Control-Allow-Origin',WHITELIST[0]);
        else res.setHeader('Access-Control-Allow-Origin',WHITELIST[WHITELIST.length-1]);
        
        let aboutStream:ReadStream|null = null;

        if (req.type === 'main') aboutStream = fs.createReadStream(path.join(__dirname, '../../data','About.txt'));
        if (req.type === 'aboutMe') aboutStream  = fs.createReadStream(path.join(__dirname, '../../data','AboutMe.txt'));
      
          aboutStream.on('open', () => {
            res.setHeader('Content-Type','text/html; charset=utf-8');
            aboutStream.pipe(res)
          });

          aboutStream.on('error', (error:Error) => {
            log.error(error.message);
            return void errorSender(res, 404);
          });
      });
};
