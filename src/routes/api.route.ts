import express from 'express';
import { Router } from 'express';

import { otherValidatorRules } from '../rules/otherValidator.rules';
import { tokenGuard } from '../middlewares/token-guard'
import { userRules } from '../rules/user.rules'
import * as Controller from '../controllers';

//initialize route here
const router = Router();
const app = express()

// Unprotected routes
router.post('/register', userRules['forRegister'], Controller.AuthenticationController._register)
router.post('/login', userRules['forLogin'], Controller.AuthenticationController._login)
router.get('/questions', Controller.QuestionsController._getQuestions)
router.get('/question/:id', Controller.QuestionsController._getAQuestion)

// Protected Routes
app.use(tokenGuard())
router.post('/question', otherValidatorRules['createQuestion'], Controller.QuestionsController._createQuestion)




export default router;
