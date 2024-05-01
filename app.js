import express, { json } from 'express';
import { resolve } from 'path';

import adminRoute from './Routes/auth.js';
import dealerRoute from './Routes/dealer.js';
import userRoute from './Routes/user.js';
const app = express();
import cors from "cors";
import dotenv from 'dotenv';
//dotenv.config({ path: resolve(__dirname, './.env') });



app.use(cors())
/*
app.use(bodyParser.urlencoded({
    extended: true
}));
*/
app.use(json());
/*
morgan.token("req-headers", function (req, res) {
    return JSON.stringify(req.headers);
  });
  */
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/admin',adminRoute);
app.use('/api/dealer',dealerRoute);
app.use('/api/user',userRoute);






export default app;
