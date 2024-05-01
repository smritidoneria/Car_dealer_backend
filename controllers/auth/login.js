import { Router } from 'express';
const router = Router();
import { connectToDb, getDb } from '../../db.js';
import { compare, hashSync } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { hash } from 'bcrypt';

const JWT_SECRET = 'smriti@123';

export async function admin(req, res, next) {
    const { username, password } = req.body;
   

    try {
        await connectToDb();
        const db = getDb();
        const { username, password } = req.body;
        const adminCollection = db.collection('admin');
        const admin = await adminCollection.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Verify password
        const isValidPassword = await compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jsonwebtoken.sign({ username: admin.username, role: 'admin' }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error('Error authenticating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
}


export async function user(req, res, next) {
   
   

    try {
        await connectToDb();
        const db = getDb();
        const { user_email, password } = req.body;
        const userCollection = db.collection('user');
        const  user = await userCollection.findOne({ user_email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Verify password
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        
        const token = jsonwebtoken.sign({ email: user.user_email, role: 'user' }, JWT_SECRET);
        console.log("||||",token);
        res.json({ token });
    } catch (error) {
        console.error('Error authenticating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
}


export async function dealer(req, res, next) {
   
   

    try {
        await connectToDb();
        const db = getDb();
        const { dealership_email, password } = req.body;
        console.log("++++",dealership_email);
        const dealerCollection = db.collection('dealership');
      
        const  dealer = await dealerCollection.findOne({ dealership_email});
        console.log("---",dealer);
        if (!dealer) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Verify password
        const isValidPassword = await compare(password, dealer.password);
        if (!isValidPassword) {
            console.log("gfdbbg");
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        
        const token = jsonwebtoken.sign({ email:dealer.dealership_email, role: 'dealer' }, JWT_SECRET);
        console.log(token);
        return res.json({ token });
    } catch (error) {
        console.error('Error authenticating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
}
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
  };

export async function forgotpassworduser(req, res, next){
    try{
        await connectToDb();
        const db = getDb();
        const {email,token} = req.body;
        
        const userCollection = db.collection('user');
        const user = await userCollection.findOne({ user_email:email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        /*
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // SMTP host (e.g., smtp.gmail.com for Gmail)
            port: 587, // Port for SMTP
            secure: false, // true for 465, false for other ports; if true, use SSL
            auth: {
              user: 'smritidoneria@gmail.com', // Your email address
              pass: 'Smriti@123', // Your email password
            },
          });
          const mailOptions = {
            from: 'smritidoneria@gmail.com',
            to: user.user_email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
              + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
              + `http://localhost:8000/api/user/resetpassword/${token}\n\n`
              + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
          };
      
          await transporter.sendMail(mailOptions);
          */
         const link=`http://localhost:3000/user/resetPassword/${token}`
        res.status(200).json({ link });





       
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function resetpassworduser(req, res, next){
    try{
        await connectToDb();
        const db = getDb();
        const { token } = req.params;
        const { password } = req.body;
        const {email}=req.body;
        const userCollection = db.collection('user');
        const user = await userCollection.findOne({ user_email:email });
        //const user = await dealerCollection.findOne({ dealership_email: req.user.email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
         }
         const hashedPassword = await hash(password, 10);
         await userCollection.updateOne({user_email:email }, {$set:{ password:hashedPassword }});
         
         res.status(200).json({ message: 'Password reset successfully' });
      



    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

    
}



