import express,{Application, Request, Response} from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import {RequestParam} from './configs/interface';
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

import {UserModel} from './configs/schema';
import {WHITELIST} from './utils/const';
import cors from 'cors';

namespace AppNamespace {

    export const app:Application = express();
    export const eventEmitter = new Events();


    export const getUser = async (login:string, password?: string) => {
        const findObject = {};
        let currentUser = null;
        if (login) findObject['login'] = login;
        if (password) findObject['password'] = password;

        mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
        await UserModel.findOne(findObject, (error:Error, user:Object) => {
            mongoose.disconnect();
            if(error) return console.log(error);
            currentUser = user;
            return user;
        });
        return currentUser;
    };

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
        cookie: {secure: false}
    }));

    adminInterface(app);
    servicesMail(app);
    servicesType(app);
    policy(app);
    price(app);
};

export default AppNamespace;
  