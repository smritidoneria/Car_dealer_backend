import { Router } from 'express';
import middleware from '../middleware.js';
const router = Router();

import { Car, getallcars, soldVehicles, getSoldCars, getCarBySearch, notSoldVehicles } from '../controllers/dealer/dealer.js';
router.route('/registerCar')
    .post(middleware,Car)
router.route('/getcars')
    .get(middleware,getallcars)

router.route('/sold/:carId')
    .post(middleware,soldVehicles)
router.route('/getsoldcar')
    .get(middleware,getSoldCars)
router.route('/getCarBySearch')
    .get(getCarBySearch)

router.route('/notsoldVehicles')
    .get(middleware, notSoldVehicles)

export default router;
