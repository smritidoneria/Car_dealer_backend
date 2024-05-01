import  jsonwebtoken  from 'jsonwebtoken';
import { connectToDb, getDb } from './db.js';

const JWT_SECRET="smriti@123"
const auth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(400).json({message:"token is not there"})
    }

    try {
        await connectToDb();
        const db = getDb();
        const dealerCollection = db.collection('dealership');
        const userCollection = db.collection('user');
        const tokenDetails = jsonwebtoken.verify(token,JWT_SECRET);
       
        if(tokenDetails.role=='dealer'){
        const user = await dealerCollection.findOne({ dealership_email:tokenDetails.email });
        if (!user) {
            return res.status(400).json({message:"User does not exist"})
            
        }
        req.user = tokenDetails;
        }else if(tokenDetails.role=='user'){
            console.log("dsghvfhvf");
        const user1 = await userCollection.findOne({ user_email:tokenDetails.email });
        if (!user1) {
            console.log("here");
            return res.status(400).json({message:"User does not exist"})
        }
        req.user1 = tokenDetails;
        }
        
        console.log("+++",tokenDetails)
        
        console.log("done");
        next();
        
    } catch (err) {
        console.log(err);
        return res.status(400).json({message:err});
    }
};

export default auth;