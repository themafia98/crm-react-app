import {Request, Response} from 'express';
import os from 'os';
import cluster from 'cluster';
import AppNamespace from './app';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import {WHITELIST} from './utils/const';
import Security from './api/security';
import MailNamespace from './api/Mail';

import {log} from './logger/logModule';

const numCPUs = os.cpus().length;

namespace Server {
    export const port:string = process.env.PORT || '3001';

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork().on('exit', (code, signal) => {
        if (signal) {
          console.log(`worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
          console.log(`worker exited with error code: ${code}`);
        } else {
          console.log('worker success!');
        }
      });
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
    
  } else {

    dotenv.config();

    const {app} = AppNamespace;


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
        console.log(`Worker ${process.pid} started`);
        console.log(`Server listen on ${port} with origin whitelist: ${WHITELIST.join(",")}.`);
        Security.create(process.env.TOKEN_YANDEX_PASSWORD, process.env.TOKEN_YANDEX_USER)
        .then(res => {
          app.locals.sender = new MailNamespace.Sender({
            host: 'smtp.yandex.ru',
            port: 465,
            auth: {
                  user: process.env.TOKEN_YANDEX_USER,
                  pass: process.env.TOKEN_YANDEX_PASSWORD
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
}

export default Server;