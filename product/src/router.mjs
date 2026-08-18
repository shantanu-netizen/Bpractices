import express from 'express'
import { Login, registerUser } from './controllers/userControllers.mjs';
const router = express.Router()
router.post('/register', registerUser)
router.post('/login',Login)
export default router;