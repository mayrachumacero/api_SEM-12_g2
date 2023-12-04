import server from './server'
import UserRouter from './presentation/routers/user-router';
import { MongoClient, ObjectId } from 'mongodb';
import NoSQLWrapper from './data/interfaces/data-sources/no-sql-wrapper';
import { Response } from 'express';
import { RegisterUserRouter } from './presentation/routers/register-user-route';
import { LoginUserRouter } from './presentation/routers/login-user-route';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//mongo
const getMongoDBClient = async (): Promise<NoSQLWrapper> => {
    const uri = process.env.API_MONGO_URI || 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    client.connect();
    const database = process.env.API_MONGO_DBNAME;
    const db = client.db(database);
    const CreateUser = async (user: any): Promise<any> => {
        const result = await db.collection('users').insertOne(user);
        console.log(`New user created with the following id: ${result.insertedId}`);
        return {
            acknowledged: result.acknowledged,
            insertedId: result.insertedId,
        };
    }
    const FindAllUsers = async (): Promise<any[]> => {
        const result = await db.collection('users').find({}).toArray();
        return result;
    }
    const FindUserByEmail = async (email:string): Promise<any> => {
        const result = await db.collection('users').findOne({email:email});
        return result;
    }
    const FindUserById = async (id:any): Promise<any> => {
        const objectId = new ObjectId(id);
        const result = await db.collection('users').findOne({_id:objectId});
        return result;
    }
    return {
        CreateUser,
        FindAllUsers,
        FindUserByEmail,
        FindUserById
    }
}

// const getPgDBClient = () => {

// }
// //todo homework
// const getSqlServerClient = () => {

// }

(async() => {
    const db = await getMongoDBClient();

    server.use('/api', UserRouter(db));
    server.use('/api', RegisterUserRouter(db));
    server.use('/api', LoginUserRouter(db));
    
    const port = process.env.API_PORT || 3000;
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})();