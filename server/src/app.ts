import express,{Application} from 'express';
import helmet from 'helmet';
import Events from 'events';
import path from 'path';

import adminInterface from './admin';
import servicesMail from './services/mail';
import policy from './services/policy';
import price from './services/price';
import servicesType from './services/servicesType';

import {WHITELIST} from './utils/const';
import cors from 'cors';

namespace AppNamespace {

    export const app:Application = express();
    export const eventEmitter = new Events();

    
    const corsOptions = {
      origin: function (origin:string, callback:(error:object, result?:boolean) => void){
            if (origin === undefined || WHITELIST.indexOf(origin) !== -1) {
                callback(null, true)
          } else {
              callback(new Error('Not allowed by CORS'))
          }
      },
      methods: ['GET', 'POST'],
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    const corsPublic = {
        origin: '*',
        methods: ['GET', 'POST'],
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      };

    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.urlencoded({extended: true}));
    app.set('views', __dirname + '/public/views');
    app.set('view engine', 'ejs');

    app.use(helmet());
    app.use(cors(corsOptions));

    adminInterface(app);
    servicesMail(app);
    servicesType(app);
    policy(app);
    price(app);
};


export default AppNamespace;
  