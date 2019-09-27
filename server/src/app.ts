import express,{Application, Request, Response} from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';

import configSession from './configs/session.json';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import Events from 'events';
import path from 'path';

import adminInterface from './admin';
import servicesMail from './services/mail';
import policy from './services/policy';
import price from './services/price';
import servicesType from './services/servicesType';

import Database from './api/DataBase';
import {WHITELIST} from './utils/const';
import cors from 'cors';

namespace AppNamespace {

    export const app:Application = express();
    export const eventEmitter = new Events();
    const SessionStore = MongoStore(session);

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

    app.get('/', (req:Request, res:Response) => {
        res.sendStatus(403);
    });

    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use('/admin',express.json());

    app.set('views', __dirname + '/public/views');
    app.set('view engine', 'ejs');

    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(session({
        // genid: () => uuid(),
        secret: configSession.secret,
        key: configSession.key,
        resave: false,
        maxAge: configSession.cookie.maxAge,
        saveUninitialized: false,
        cookie: {secure: false},
        store: new SessionStore(Database.storeSession())
    }));

    adminInterface(app);
    servicesMail(app);
    servicesType(app);
    policy(app);
    price(app);
};

export default AppNamespace;
  