import { Router } from 'express';
import middleware from '../middleware.js';
const router = Router();
import { admin, user, dealer } from '../controllers/auth/register.js';
import { admin as _admin, user as _user, dealer as _dealer ,forgotpassworduser,resetpassworduser} from '../controllers/auth/login.js';

router.route('/registeradmin')
    .post(admin)
router.route('/registeruser')
    .post(user)
router.route('/registerdealer')
    .post(dealer)
router.route('/loginadmin')
    .post(_admin);
router.route('/loginuser')
    .post(_user);
router.route('/logindealer')
    .post(_dealer);

router.route('/forgotpassworduser')
    .post(forgotpassworduser)

router.route('/resetpassworduser/:token')
    .post(resetpassworduser)

export default router;
