import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import uploadManyMiddleware from '../middlewares/upload-middleware.js';
import { 
  getImages,
  uploadImages,
  deleteImage,
} from '../controllers/image-controller.js';

const router = express.Router();

// middlewares
router.use(authMiddleware);

router.get('/', getImages);

router.post('/', uploadManyMiddleware('files'), uploadImages);

router.delete('/:id', deleteImage);

export default router;