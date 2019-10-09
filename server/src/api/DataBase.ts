import { Binary } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {UserModel, FileModel, CardsModel} from '../configCode/schema';

import {Card} from '../configCode/interface';
import {log, debug} from '../logger/logModule';

namespace Database {

    dotenv.config();

    export const storeSession = () => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useUnifiedTopology', true);
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

        const connect = await mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => {  log.error(err); return void console.log(err); });
        await UserModel.findOne(findObject, (err:Error, user:Object) => {
            if (connect) connect.disconnect().catch(err => {  log.error(err); });
            if (err) {  log.error(err); return void console.log(err); }
            currentUser = user;
            return user;
        });
        return currentUser;
    };

    export const saveFile = async (file:{fileName: string,format:string, binary: any}):Promise<boolean> => {
        const { fileName, binary, format } = file;
        let status = false;
        if (!fileName || !binary) return false;

        const fileObj = new FileModel({
            fileName: fileName,
            format: format,
            file: binary,
        });

        const connect = await mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => {  log.error(err); return void console.log(err); });

        await fileObj.save((err:Error):void => {
            if (connect) connect.disconnect().catch(err => {  log.error(err); });
            if (err) {  log.error(err); return void console.log(err); }
            debug.info('Save file in database.', fileObj);
            status = true;
        });

        return status;
    };

    export const getCards = async (type:string):Promise<Array<Object>> => {
        let result = [];
        try {
            const connect = await mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
            .catch(err => {  log.error(err); return void console.log(err); });

            return await CardsModel.find({type: type}, (err:Error, docs:Array<Object>) => {
                if (connect) connect.disconnect().catch(err => {  log.error(err); });
                if (err) {  log.error(err); return void console.log(err); }
                if (docs){
                    result = docs.map(card => {
                        return {id: card['_id'] + '', name: card['name'], content: card['content'], price: card['price']};
                    });
                    debug.info(`Find cards array.`, result);
                    return true;
                }
            });
        }
        catch(err) {
            log.error(err); 
            return void console.log(err);
        }
    };

    export const putCard = async (type:string, name:string, content:string, price:string):Promise<boolean> =>{
        try {
            let answer = true;
            const connect = await mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
            .catch(err => {  log.error(err); return void console.log(err); });

            await CardsModel.create({type: type, name: name, content: content, price: price}, (err:Error, doc:Card) => {
                if (connect) connect.disconnect().catch(err => {  log.error(err); });
                if (err){  log.error(err); return void console.log(err); }
                debug.info(`Create new card.`, doc);
                return answer;
            });
            return answer;
        } catch(err){
            log.error(err); 
            return void console.log(err);
        }
    };

    export const deleteCard = async (_id:string):Promise<boolean> =>{
        try {
            let answer = true;
            const connect = await mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
            .catch(err => {  log.error(err); return void console.log(err); });

            await CardsModel.findByIdAndRemove(_id, (err:Error, offer:Card) => {
                if (connect) connect.disconnect().catch(err => {  log.error(err); });
                if (err){  log.error(err); return void console.log(err); }
                debug.info(`Delete card.`, offer);
                return answer;
            });
            return answer;
        } catch(err){
            log.error(err); 
            return void console.log(err);
        }
    };

    export const getFile = async (fileName:string, format:string):Promise<Object> => {
        let status = false;
        let findFiles:Array<Object>|null = null;
        const connect = await mongoose.connect(process.env.MONGO_DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => {  log.error(err); return void console.log(err); });
        
        await FileModel.find({name: fileName, format: format}, (err:Error, docs:Array<Object>) => {
           if (connect) connect.disconnect().catch(err => {  log.error(err); });
            if (err) {  log.error(err); return void console.log(err); }
            if (docs as Array<Object> && docs.length){
                status = true;
                findFiles = docs;
                debug.info(`Find fiels.`, findFiles);
            }
        });

        return { status: status, fileArray: findFiles, format: format};
    };
};

export default Database;