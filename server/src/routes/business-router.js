import express from 'express';
import { 
  getBusinessCategories,
  createBusinessCategory
} from '../controllers/business-controller.js';

const router = express.Router();

router.get('/', getBusinessCategories);

router.post('/', createBusinessCategory);

export default router;