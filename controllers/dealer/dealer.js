import { Router } from 'express';
const router = Router();
import { ObjectId } from 'mongodb';

import { connectToDb, getDb } from '../../db.js';

export async function Car(req, res, next) {
    const { car_id, type, name, model, car_info } = req.body;
   
    try {
        await connectToDb();
        const db = getDb();
        const carsCollection = db.collection('cars');
        
        const dealerCollection = db.collection('dealership');
        const dealer = await dealerCollection.findOne({ dealership_email: req.user.email });
        
        console.log(dealer);
        // Check if car ID already exists
        const existingCar = await carsCollection.findOne({ car_id });
        if (existingCar) {
            return res.status(400).json({ message: 'Car ID already exists' });
        }

        // Create a new car object
        const newCar = {
            car_id,
            type,
            name,
            model,
            car_info
        };

        // Insert the new car into the database
        await carsCollection.insertOne(newCar);

        // Update the dealer's cars array with the new car ID
        await dealerCollection.updateOne({dealership_email: req.user.email }, { $push: { cars: newCar._id } });

        res.status(201).json({ message: 'Car registered successfully' });
    } catch (error) {
        console.error('Error registering car:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function soldVehicles(req, res, next) {
    console.log("######");
    const carId = req.params.carId;
    console.log("++++",carId);

     // Get the carId from URL params

    try {
        await connectToDb();
        const db = getDb();
        const soldVehiclesCollection = db.collection('sold_vehicles');
        const carCollection = db.collection('cars');
        const userCollection = db.collection('user');
        const user = await userCollection.findOne({ user_email: req.user1.email });
        console.log('&&&&&',user);

        const carObjectId = new ObjectId(carId);
        const newsold={
            car_id:[carObjectId],
            owner_id:user._id
        }
        const result = await soldVehiclesCollection.insertOne(newsold);
        await carCollection.updateOne({ _id: carObjectId }, { $set: { sold: true } });

        return res.status(200).json({ message: 'Sold vehicle information saved successfully' });
    } catch (error) {
        console.error('Error registering car:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
}

export async function notSoldVehicles(req, res, next) {
    try {
    
        await connectToDb();
        const db = getDb();
        
  
        const dealerCollection = db.collection('dealership');
        const dealer = await dealerCollection.findOne({ dealership_email: req.user.email });

        if (!dealer) {
            return res.status(404).json({ message: 'Dealer not found' });
        }

        const carCollection = db.collection('cars');


        const notSoldVehicles = await carCollection.find({ 
            _id: { $in: dealer.cars },
            $or: [{ sold: { $exists: false } }, { sold: false }]
        }).toArray();


        res.status(200).json(notSoldVehicles);
    } catch (error) {
        console.error('Error retrieving not sold vehicles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export async function getallcars(req, res, next) {
    try {
        await connectToDb();
        const db = getDb();
        const dealerCollection = db.collection('dealership');
        const carCollection = db.collection('cars');

        const dealer = await dealerCollection.findOne({ dealership_email: req.user.email });
        if (!dealer) {
            return res.status(404).json({ message: 'Dealer not found' });
        }

        const carIds = dealer.cars;

        const cars = await Promise.all(carIds.map(async (carId) => {
            const car = await carCollection.findOne({ _id: carId });
            return car;
        }));

        res.json({ cars });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getSoldCars(req, res, next) {
    try {
        await connectToDb();
        const db = getDb();
        const carCollection = db.collection('cars');
        const dealerCollection = db.collection('dealership');
        const user = await dealerCollection.findOne({ dealership_email: req.user.email });
        const carIds = user.cars;

        // Array to store the details of sold cars
        const soldCars = [];

        // Iterate through each car ID in the user's cars array
        for (const carId of carIds) {
            // Find the car in the cars collection
            const car = await carCollection.findOne({ _id: carId });

            // Check if the car exists and is sold
            if (car && car.sold) {
                soldCars.push(car);
            }
        }

        // Return the details of sold cars
        res.json({ soldCars });
    } catch (error) {
        console.error('Error fetching sold cars:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export async function getCarBySearch(req, res, next) {
    try {
       
        const dealerName = req.query.name;
        console.log("||||",dealerName);

        await connectToDb();
        const db = getDb();
        const dealerCollection = db.collection('dealership');
        const dealer = await dealerCollection.findOne({ dealership_name: dealerName });

        if (!dealer) {
            return res.status(404).json({ message: 'Dealer not found' });
        }
        const carIds = dealer.cars;
        console.log("}}}",carIds)
        const carCollection = db.collection('cars');
        const cars = await carCollection.find({ _id: { $in: carIds } }).toArray();
        console.log(">>>>",cars);
        res.status(200).json({ cars });
    } catch (error) {
        // Handle errors
        console.error('Error fetching cars by dealer name:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}








