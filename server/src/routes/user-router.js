import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import { getUsers,  updateUser} from '../controllers/user-controller.js';

const router = Router();

// middlewares
router.use(authMiddleware);

router.get('/', getUsers);

router.patch('/', updateUser);

export default router;