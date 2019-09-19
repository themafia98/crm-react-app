import express,{Application} from 'express';
import helmet from 'helmet';
import Events from 'events';

import servicesMail from './services/mail';
import policy from './services/policy';
import price from './services/price';
import servicesType from './services/servicesType';

import cors from 'cors';

namespace AppNamespace {

    export const app:Application = express();
    export const eventEmitter = new Events();
    
    const corsOptions = {
      origin: function (origin:string, callback:(error:object, result?:boolean) => void) {
          if (app.locals.frontend.origin === origin) {
              callback(null, true)
          } else {
              callback(new Error('Not allowed by CORS'))
          }
      },
      methods: ['GET', 'POST'],
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    app.use(cors(corsOptions));
    app.use(helmet());
  
    servicesMail(app);
    servicesType(app);
    policy(app);
    price(app);
};


export default AppNamespace;
  