import { MongoClient } from 'mongodb';

let dbConnection;

export function connectToDb(cb) {
  if (typeof cb !== 'function') {
    console.error('Callback function is required');
    return;
  }

  MongoClient.connect('mongodb+srv://smritidoneria:Smriti123@cluster0.ozto3jo.mongodb.net/')
    .then(client => {
      dbConnection = client.db();
      console.log("Connected to MongoDB");
      cb(); // Call the callback function when connected successfully
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
      cb(err); // Call the callback function with the error if connection fails
    });
}
export function getDb() { return dbConnection; }
