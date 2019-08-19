import {Request, Response} from 'express';
import AppNamespace from './app';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import {debug, log} from './logger/logModule';
import corsOptions from './configs/cors';
import cors from 'cors';


const {app} = AppNamespace;
const port:string = process.env.PORT || '3001';

if(process.env.NODE_ENV === 'production')
app.locals.frontend = new URL('https://themafia98.github.io');
else app.locals.frontend = new URL('http://localhost:3000');

fs.readFile(path.join(__dirname, '/configs', 'limit.json'),'utf-8', (error: Error, config:Buffer) => {
  app.use(rateLimit(config));  // 15 * 60 * 1000
});
    // // error handler
app.use((err:Error, req:Request, res:Response):void => {
      // set locals, only providing error in development
  const today = new Date();
  const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  log.error(`${res.locals.message} / ${day}/${time}`);
  res.sendStatus(403);
});

app.use(cors(corsOptions));
app.disable('x-powered-by');
app.set('port', port);


app.listen(port,() => {

    const today = new Date();
    const time  = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    console.log(`Server listen on ${port} with origin ${app.locals.frontend}`);
    debug.info(`Server ${app.get('port')} start in ${day}/${time} with origin ${app.locals.frontend}`);

});

