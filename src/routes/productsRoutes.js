import {Router} from 'express';
const router = Router();
import {createProduct,getProduct,getProducts,updateProduct,deleteProduct} from '../controllers/productsController';
import {RoleAdmin, verifyToken} from '../middlewares/authToken';

router.post('/', [verifyToken,RoleAdmin],createProduct);
router.get('/', getProducts);
router.get('/:productId', getProduct);
router.put('/:productId',[verifyToken,RoleAdmin],updateProduct);
router.delete('/',[verifyToken,RoleAdmin] ,deleteProduct);

export default router;