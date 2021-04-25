import { Request, Response } from 'express';
import BaseController from './BaseController';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator';
import { AnswerInstance } from '../models/Answer';

import { createModels } from '../models';
const db = createModels();

class AnswersController extends BaseController {
	constructor(req: Request, res: Response) {
		super(req, res);
		this.req = req;
		this.res = res;
	}

	static _addAnswer = async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return AnswersController._responseError(res, 'KPT004', 'Validation failed', errors.array(), 422);

			const existingAnswer = await db.Answer.findOne(req.body);
			if (existingAnswer) return AnswersController._responseError(res, 'KPT009', 'Duplicate Answer', null, 409);

			const payload = matchedData(req) as AnswerInstance;

			const answer: AnswerInstance = await db.Answer.create(payload);

			if (answer) return AnswersController._responseSuccess(res, '00', 'Successfully Added', answer, 200);
		} catch (error) {
			return AnswersController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};

	static _getAnswers = async (req: Request, res: Response) => {
		try {
			const answers: AnswerInstance[] = await db.Answer.findAll();
			return AnswersController._responseSuccess(res, '00', 'Successfully Fetched', answers, 200);
		} catch (error) {
			return AnswersController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};

	static _getAnswerUpvoters = async (req: Request, res: Response) => {
		try {
			db.Answer.findById(req.params.id)
				.then((answer) => answer?.getUpvoters())
				.then((upvoters) =>
					res.status(200).json({
						user_ids: upvoters?.map((user) => user.id),
					})
				);
		} catch (error) {
			return AnswersController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};
}

export default AnswersController;
