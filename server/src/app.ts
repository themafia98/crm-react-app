import express,{Application, Request, Response} from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import Events from 'events';

import adminInterface from './Controllers/admin';
import servicesMail from './Controllers/services/mail';
import policy from './Controllers/services/policy';
import about from './Controllers/services/about';
import price from './Controllers/services/price';
import servicesType from './Controllers/services/servicesType';

import Database from './Models/DataBase';
import {WHITELIST} from './utils/const';
import cors from 'cors';

namespace AppNamespace {

    export const app:Application = express();
    export const eventEmitter = new Events();

    const SessionStore = MongoStore(session);

    const sessionOptions = {
        secret: 'crmih',
        key: "sid",
        resave: false,
        maxAge: null,
        saveUninitialized: false,
        cookie: {secure: false},
        store: new SessionStore(Database.storeSession()),
    };

    const corsOptions = {
      origin: function (origin:string, callback:(error:object, result?:boolean) => void){
            if (origin === undefined || WHITELIST.indexOf(origin) !== -1) {
                callback(null, true)
          } else {
              callback(new Error('Not allowed by CORS'))
          }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    app.get('/', (req:Request, res:Response) => {
        res.sendStatus(403);
    });

    app.use(express.static(__dirname + '/public'));
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use('/admin',express.json());

    app.set('views',__dirname + '/views');
    app.engine('ejs', require('ejs').__express);
    app.set('view engine', 'ejs');

    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(session(sessionOptions));

    adminInterface(app);
    servicesMail(app);
    servicesType(app);
    policy(app);
    about(app);
    price(app);
};

export default AppNamespace;
  