import { Binary } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {UserModel, FileModel} from '../configCode/schema';

import {log} from '../logger/logModule';
import { type } from 'os';

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
        await UserModel.findOne(findObject, (err:Error, user:Object) => {
            mongoose.disconnect();
            if (err) {  log.error(err); return void console.log(err); }
            currentUser = user;
            return user;
        });
        return currentUser;
    };

    export const saveFile = async (file:{fileName: string, binary: any}):Promise<boolean> => {
        const { fileName, binary } = file;
        let status = false;
        if (!fileName || !binary) return false;

        const fileObj = new FileModel({
            fileName: fileName,
            file: binary
        });

        mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
        await fileObj.save((err:Error):void => {
            mongoose.disconnect();
            if (err) {  log.error(err); return void console.log(err); }
            console.log('Save file in database');
            status = true;
        });

        return status;
    };

    export const getFile = async (fileName:string):Promise<Object> => {
        let status = false;
        let findFiles:Array<Object>|null = null;
        mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
        await FileModel.find({name: fileName}, (err:Error, docs:Array<Object>) => {
            mongoose.disconnect();
            if (err) {  log.error(err); return void console.log(err); }
            if (docs as Array<Object> && docs.length){
                status = true;
                findFiles = docs;
            }
        });

        return { status: status, fileArray: findFiles};
    };
};

export default Database;