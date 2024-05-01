// main file (e.g., dbSetup.js)

import express from 'express';
import app from './app.js'
import { getDb, connectToDb } from './db.js';
import { adminSchema, userSchema, dealershipSchema, dealSchema, carSchema, soldVehiclesSchema } from './schema.js'; 

let db;

connectToDb((err) => {
  if (!err) {
  
    app.listen('8000', () => {
      console.log('App listening on port 8000');
    });
 
    db = getDb();
   
    setupDatabase();
  }
});

async function setupDatabase() {
  try {
    
    await db.createCollection('admin', { validator: { $jsonSchema: { bsonType: 'object', properties: adminSchema } } });
    await db.createCollection('user', { validator: { $jsonSchema: { bsonType: 'object', properties: userSchema } } });
    db.createCollection('dealership', { validator: { $jsonSchema: { bsonType: 'object', properties: dealershipSchema } } });
    db.createCollection('deal', { validator: { $jsonSchema: { bsonType: 'object', properties: dealSchema } } });
    db.createCollection('cars', { validator: { $jsonSchema: { bsonType: 'object', properties: carSchema } } });
    db.createCollection('sold_vehicles', { validator: { $jsonSchema: { bsonType: 'object', properties: soldVehiclesSchema } } });

  
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}
