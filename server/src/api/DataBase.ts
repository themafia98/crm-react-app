import { Binary } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {UserModel, FileModel} from '../configCode/schema';

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
            if(error) {
                log.error(error);
                return console.error(error);
            }
            currentUser = user;
            return user;
        });
        return currentUser;
    };

    export const saveFile = async (fileName:string, file:Object) => {
        if (!fileName || !file) return false;

        const fileObj = new FileModel({
            fileName: fileName,
            file: new Binary(<Buffer>file)
        });

        mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

    };
};

export default Database;