import { Router } from 'express';

import { otherValidatorRules } from '../rules/otherValidator.rules';
import * as Controller from '../controllers';

//initialize route here
const router = Router();

// Protected Routes
router.post('/question', otherValidatorRules['createQuestion'], Controller.QuestionsController._createQuestion)
router.post('/answer', otherValidatorRules['addAnswer'], Controller.AnswersController._addAnswer)
router.post('/subscribe', otherValidatorRules['addSubscription'], Controller.SubscriptionController._addSubcription)
router.get('/notifications/:userId', Controller.NotificationController._getUserNotifications)
router.get('/subscriptions/:questionId', Controller.SubscriptionController._getQuestionSubscriptions)

export default router;