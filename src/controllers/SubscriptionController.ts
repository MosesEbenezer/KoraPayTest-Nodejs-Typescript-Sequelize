import { Request, Response } from 'express';
import BaseController from './BaseController';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator';

import { createModels } from '../models';
import { SubscriptionInstance } from 'models/Subscription';
const db = createModels();

class SubscriptionController extends BaseController {
	constructor(req: Request, res: Response) {
		super(req, res);
		this.req = req;
		this.res = res;
	}

	static _addSubcription = async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return SubscriptionController._responseError(res, 'KPT004', 'Validation failed', errors.array(), 422);

			const existingSubcription = await db.Subscription.findOne({ where: req.body });
			if (existingSubcription)
				return SubscriptionController._responseError(res, 'KPT009', 'Duplicate Subscription', null, 409);

			const payload = matchedData(req) as SubscriptionInstance;
			const subscrption: SubscriptionInstance = await db.Subscription.create(payload);

			if (subscrption)
				return SubscriptionController._responseSuccess(res, '00', 'Successfully Created', subscrption, 200);
		} catch (error) {
			return SubscriptionController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};

	// static _getQuestionSubscriptions = async (req: Request, res: Response) => {
	// 	try {
	// 		const Subscription: QuestionInstance[] = await db.Question.findAll();
	// 		return SubscriptionController._responseSuccess(res, '00', 'Successfully Fetched', Subscription, 200);
	// 	} catch (error) {
	// 		return SubscriptionController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
	// 	}
	// };

	// static _getAQuestion = async (req: Request, res: Response) => {
	// 	try {
	// 		const question: QuestionInstance[] = await db.Question.findAll({
	// 			where: { id: req.params.id },
	// 		});
	// 		return SubscriptionController._responseSuccess(res, '00', 'Successfully Fetched', question, 200);
	// 	} catch (error) {
	// 		return SubscriptionController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
	// 	}
	// };
}

export default SubscriptionController;
