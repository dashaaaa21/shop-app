import express from 'express';
import { getProfile, updateProfile, updatePassword } from '../controllers/userController.js';
import { protect } from '../middleware/supabaseAuth.js';

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.patch('/password', updatePassword);

export default router;
