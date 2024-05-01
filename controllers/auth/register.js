import { Router } from 'express';
const router = Router();
import { connectToDb, getDb } from '../../db.js';
import { hash } from 'bcrypt';




export async function admin(req, res, next) {
    const { username, password } = req.body;
   

    try {
        await connectToDb();
        const db = getDb();
        const adminCollection = db.collection('admin');
        const existingAdmin = await adminCollection.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const hashedPassword = await hash(password, 10);
        const newAdmin = {
            username,
            password: hashedPassword
        };
        const result = await adminCollection.insertOne(newAdmin);
        
            return res.status(201).json({ message: 'Admin registered successfully' });
    
            
        
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
}


export async function user(req, res, next) {
    console.log('fdhsgchgbhfbdshbhbhfvcdbfbsf')
    const { user_email, user_id, user_location, user_info, password} = req.body;

   

    try {
        await connectToDb();
        const db = getDb();
        const userCollection = db.collection('user');

       
        const existingUser = await userCollection.findOne({ user_email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await hash(password, 10);
        const newUser = {
            user_email,
            user_id,
            user_location,
            user_info,
            password: hashedPassword,
           
        };
        const result = await userCollection.insertOne(newUser);
        
        return res.status(201).json({ message: 'User registered successfully' });
        
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
}


export async function dealer(req, res, next) {
    console.log('fdhsgchgbhfbdshbhbhfvcdbfbsf')
    const { dealership_email, dealership_id, dealership_name, dealership_location, password, dealership_info } = req.body;


   

    try {
        await connectToDb();
        const db = getDb();
        const dealershipCollection = db.collection('dealership');
        
        // Validate request body against schema
       
        // Check if dealership email already exists
        const existingDealership = await dealershipCollection.findOne({ dealership_email });
        if (existingDealership) {
            return res.status(400).json({ message: 'Dealership email already exists' });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create a new dealership object
        const newDealership = {
            dealership_email,
            dealership_id,
            dealership_name,
            dealership_location,
            password: hashedPassword,
            dealership_info,
            cars: [],
            deals: [],
            sold_vehicles: []
        };

        // Insert the new dealership into the database
        const result = await dealershipCollection.insertOne(newDealership);
        return res.status(201).json({ message: 'User registered successfully' });

      
    } catch (error) {
        console.error('Error registering dealership:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
}
