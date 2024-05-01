import { Router } from 'express';
const router = Router();
import { Car, purchased , fetchDealerByCar} from "../controllers/user/cars.js";
import middleware from '../middleware.js';


router.route('/car')
    .get(Car)

router.route('/purchase')
    .get(middleware,purchased)

router.route('/fetchDealerByCar/:carId')
    .get(fetchDealerByCar)


export default router;