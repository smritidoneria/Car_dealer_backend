import { Router } from 'express';
const router = Router();

import { connectToDb, getDb } from '../../db.js';
import { ObjectId } from 'mongodb';

export async function Car(req, res, next) {
    try {
        // Connect to the database
        await connectToDb();
        const db = getDb();
        const carsCollection = db.collection('cars');
    
        // Fetch all cars from the database
        const cars = await carsCollection.find({}).toArray();
    
        // Send the cars as a response
        res.json({ cars });
      } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
    
}
export async function purchased(req, res, next) {
  try {
      await connectToDb();
      const db = getDb();
      const dealerCollection = db.collection('user');
      const soldCollection = db.collection('sold_vehicles');
      const carsCollection = db.collection('cars');
      const user = await dealerCollection.findOne({ user_email: req.user1.email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const purchasedVehicles = await soldCollection.find({ owner_id: user._id }).toArray();
      const purchasedCars = [];
      for (const vehicle of purchasedVehicles) {
          for (const carId of vehicle.car_id) {
              const car = await carsCollection.findOne({ _id: carId });
              if (car) {
                  purchasedCars.push(car);
              }
          }
      }
      res.json({ purchasedCars });
  } catch (error) {
      console.error('Error fetching purchased vehicles:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}


export async function fetchDealerByCar(req, res, next) {
    const carId = req.params.carId; // Assuming carId is passed as a parameter

    try {
        const db = getDb();
        const dealershipCollection = db.collection('dealership');

        // Convert carId to ObjectId
        const objectIdCarId = new ObjectId(carId);

        // Find the dealership where cars array contains the carId
        const dealer = await dealershipCollection.findOne({ cars: objectIdCarId });
        console.log("}}}}}}}",dealer)

        if (!dealer) {
            // If no dealership found with the specified carId, send a 404 response
            return res.status(404).json({ message: 'Dealer not found for the specified car' });
        }

        // Send the dealer information in the response
        res.status(200).json(dealer);
    } catch (error) {
        console.error('Error fetching dealer by car:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


