import { Router } from 'express';

import { userRules } from '../rules/user.rules'
import * as Controller from '../controllers';

//initialize route here
const router = Router();

// Unprotected routes
router.post('/register', userRules['forRegister'], Controller.AuthenticationController._register)
router.post('/login', userRules['forLogin'], Controller.AuthenticationController._login)
router.get('/questions', Controller.QuestionsController._getQuestions)
router.get('/question/:id', Controller.QuestionsController._getAQuestion)
router.get('/answer/:id', Controller.AnswersController._getOneAnswer)

export default router;
