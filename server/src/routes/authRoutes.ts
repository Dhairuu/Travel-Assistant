import express from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/authController';
import { authenticateJWT } from '../utils/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateJWT, getCurrentUser);

export default router; 