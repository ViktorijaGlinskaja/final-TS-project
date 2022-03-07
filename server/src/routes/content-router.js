import express from 'express';
import { 
  getContentCategories,
  createContentCategory,
  getContentCategory,
  deleteContentCategory,
  updateContentCategory,
  replaceContentCategory
} from '../controllers/content-controller.js';

const router = express.Router();

router.get('/', getContentCategories);

router.post('/', createContentCategory);

router.get('/:id', getContentCategory);

router.delete('/:id', deleteContentCategory);

router.patch('/:id', updateContentCategory);

router.put('/:id', replaceContentCategory);

export default router;