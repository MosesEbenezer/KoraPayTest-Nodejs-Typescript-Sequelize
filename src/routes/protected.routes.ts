import { Router } from 'express';

import { otherValidatorRules } from '../rules/otherValidator.rules';
import * as Controller from '../controllers';

//initialize route here
const router = Router();

// Protected Routes
router.post('/question', otherValidatorRules['createQuestion'], Controller.QuestionsController._createQuestion)
router.post('/answer', otherValidatorRules['addAnswer'], Controller.AnswersController._addAnswer)

export default router;