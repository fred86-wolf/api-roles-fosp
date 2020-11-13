import {Router} from 'express';
const router = Router();
import {signUp,signIn} from '../controllers/authController'; 
import { checkUser } from '../middlewares/roleVerify';

router.post('/signup',checkUser,signUp);

router.post('/signin', signIn);

export default router;