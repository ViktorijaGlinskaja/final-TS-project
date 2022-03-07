import express from 'express';
import {auth, register, login, checkEmail}  from '../controllers/auth-controller.js';
import { postCards, getCards } from '../controllers/card-controller.js';
import authConfigureMiddleware from '../middlewares/auth-configure-middleware.js';

const router = express.Router();
router.use(authConfigureMiddleware);

router.post('/', auth);

// POST - /api/auth/register
router.post('/register', register);

// POST - /api/auth/login
router.post('/login', login);

router.get('/check-email', checkEmail)

// router.post('/swiper', postCards);

// router.get('/swiper', getCards);

export default router;