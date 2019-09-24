import mongoose from 'mongoose';
import {UserModel} from '../configs/schema';

namespace Database {

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

};

export default Database;