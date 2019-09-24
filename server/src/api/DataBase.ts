import {MongoClient} from 'mongodb';
import AppNamespace from '../app';

namespace Database {

    export const init = () => {
        // const app = AppNamespace.app;

        // const db:MongoClient = new MongoClient(process.env.MONGO_DB_CONNECT,
        //                 {useNewUrlParser: true, useUnifiedTopology: true});

        // db.connect((error, client) => {
        //     if (error) return console.error(error.message);
        //     else {
        //         const database = client.db(process.env.MAIN_DATABASE);
        //         app.locals.db = client;
        //         app.locals.collectionAdminUsers = database.collection("adminUsers");
        //         app.locals.collectionCrmData = database.collection("crmData");
        //         console.log('Mongo db connect');
        //     };
        // });
    }

};

export default Database;