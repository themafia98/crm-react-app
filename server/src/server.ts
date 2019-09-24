import {Request, Response} from 'express';
import AppNamespace from './app';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import {WHITELIST} from './utils/const';
import Security from './api/security';
import MailNamespace from './api/Mail';

import {log} from './logger/logModule';

namespace Server {

  dotenv.config();

  const {app} = AppNamespace;
  export const port:string = process.env.PORT || '3001';


  if(process.env.NODE_ENV === 'production')
    WHITELIST.push('https://crm-react-app.netlify.com');

  fs.readFile(path.join(__dirname, '/configs', 'limit.json'),'utf-8', (error: Error, config:Buffer) => {
    app.use(rateLimit(config));  // 15 * 60 * 1000
  });

      /** @ErrorHandler */
  app.use((err:Error, req:Request, res:Response):void => {
        // set locals, only providing error in development
            const today = new Date();
            const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            console.error(err.name);
            if (err.name) log.error(`${err.name} / ${day}/${time}`);
  });

  app.set('port', port);
  const server = app.listen(port,() => {
      console.log(`Server listen on ${port} with origin whitelist: ${WHITELIST.join(",")}.`);
      Security.create().then(res => {
        app.locals.sender = new MailNamespace.Sender({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, 
          auth: {
                user: process.env.TOKEN_GMAIL_USER,
                pass: process.env.TOKEN_GMAIL_PASSWORD
          }
        });
      });
      
  });


  process.on('SIGTERM', () => {
    server.close(() => {
      console.log("Finished");
    });
  });

}

export default Server;