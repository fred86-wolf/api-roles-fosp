import {Router} from 'express';
const router = Router();
import {createUser} from '../controllers/userController';
import {RoleAdmin, verifyToken} from '../middlewares/authToken';
import { checkRoles } from '../middlewares/roleVerify';

router.post('/',[verifyToken,RoleAdmin],createUser);

export default router;