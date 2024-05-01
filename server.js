// main file (e.g., dbSetup.js)

import express from 'express';
import app from './app.js'
import { getDb, connectToDb } from './db.js';
import { adminSchema, userSchema, dealershipSchema, dealSchema, carSchema, soldVehiclesSchema } from './schema.js'; // Importing the schemas

let db;

connectToDb((err) => {
  if (!err) {
    // If connection is successful, start the Express app
    app.listen('8000', () => {
      console.log('App listening on port 8000');
    });
    // Get the database instance
    db = getDb();
    // Call a function to set up the database
    setupDatabase();
  }
});

async function setupDatabase() {
  try {
    // Create collections with the defined schema structures
    await db.createCollection('admin', { validator: { $jsonSchema: { bsonType: 'object', properties: adminSchema } } });
    await db.createCollection('user', { validator: { $jsonSchema: { bsonType: 'object', properties: userSchema } } });
    db.createCollection('dealership', { validator: { $jsonSchema: { bsonType: 'object', properties: dealershipSchema } } });
    db.createCollection('deal', { validator: { $jsonSchema: { bsonType: 'object', properties: dealSchema } } });
    db.createCollection('cars', { validator: { $jsonSchema: { bsonType: 'object', properties: carSchema } } });
    db.createCollection('sold_vehicles', { validator: { $jsonSchema: { bsonType: 'object', properties: soldVehiclesSchema } } });

    // Print success message
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}
