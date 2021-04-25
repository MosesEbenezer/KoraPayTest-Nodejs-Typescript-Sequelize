import express from 'express';
import { Router } from 'express';

import validate from '../helpers/validators';
import { tokenGuard } from '../middlewares/token-guard'
import { userRules } from '../rules/user.rules'
import * as Controller from '../controllers';

//initialize route here
const router = Router();
const app = express()


// Unprotected routes
router.post('/register', userRules['forRegister'], Controller.AuthenticationController._register)
router.post('/login', userRules['forLogin'], Controller.AuthenticationController._login)



// Protected Routes
app.use(tokenGuard())



export default router;
