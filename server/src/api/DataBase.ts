import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {UserModel, SessionModel} from '../configs/schema';
import { connect } from 'net';

import {log} from '../logger/logModule';

namespace Database {

    dotenv.config();

    export const storeSession = () => {
        return {
            dbname: process.env.MAIN_DATABASE,
            host: process.env.HOST_MONGO_DB,
            port: process.env.PORT_MONGO_DB,
            username:process.env.MONGO_USERNAME,
            password: process.env.MONGO_PASSWORD,
            mongooseConnection: mongoose.connection,
            url: process.env.MONGO_DB_CONNECT,
            collection: process.env.SESSION_COLLECTION_MOGO_DB,
        };
    };

    export const getUser = async (login:string, password?: string) => {
        const findObject = {};
        let currentUser = null;
        if (login) findObject['login'] = login;
        if (password) findObject['password'] = password;

        mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
        await UserModel.findOne(findObject, (error:Error, user:Object) => {
            mongoose.disconnect();
            if(error) return console.error(error);
            currentUser = user;
            return user;
        });
        return currentUser;
    };

    // export const getSession = async (login:string) => {
    //     let session = false;
    //     mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
    //     await SessionModel.findOne({login: login}, (error:Error, user:Object) => {
    //         mongoose.disconnect();
    //         if(error) return console.error(error);
    //         if (user) session = true;
    //         return session;
    //     });
    //     return session;
    // };

    // export const createSession = async (login:string) => {
    //     let done = false;
    //     mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
    //     await SessionModel.create({login: login},(error, session) => {
    //         if (error) return console.error(error.message);
    //         done = true;
    //         console.log('Save session', session);
    //        mongoose.disconnect();
    //        return done;
    //     });
    //     return done;
    // };

};

export default Database;