import {MongoClient} from 'mongodb';

namespace Database {

    export const init = () => {

        const db:MongoClient = new MongoClient(process.env.MONGO_DB_CONNECT,
                        {useNewUrlParser: true, useUnifiedTopology: true});

        db.connect((error, client) => {
            if (error) return console.error(error.message);
            else {
                console.log('Mongo db connect');
                
                const db = client.db(process.env.MAIN_DATABASE);
                const collection = db.collection("adminUsers");
                collection.find().toArray((error, results) => {
                    console.log(results);
                });
                client.close();
            };
        });
    }

};

export default Database;