require('dotenv').config()
const {MongoClient} = require('mongodb')

const uri = process.env.MONGODB_URL;

// const client = new MongoClient(uri);
const client = new MongoClient(uri); 
const dbName = "db_c1_fb";

async function mongoConnect() {
    try {
        await client.connect();
        console.log("Successfully to connect mongodb");
        // console.log(client.db(dbName));
        return client;
    } catch (error) {
        await client.close();
        throw error;
    }
}

function getDatabase() {
    return client.db(dbName)
}

mongoConnect()

module.exports= {
    mongoConnect,
    getDatabase,
};
