import express from 'express';

import { register, login, verifyJWT, isAuth } from './controllers/Credential.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/isUserAuth', verifyJWT, isAuth)

export default router;