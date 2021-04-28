import { Request, Response } from 'express';
import BaseController from './BaseController';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator';
import { AnswerAttributes, AnswerInstance } from '../models/Answer';
import NotificationController from './NotificationController';

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

			const existingAnswer = await db.Answer.findOne({ where: req.body });
			if (existingAnswer) return AnswersController._responseError(res, 'KPT009', 'Duplicate Answer', null, 409);

			const payload = matchedData(req) as AnswerInstance;
			const answer: AnswerInstance = await db.Answer.create(payload);

			if (answer) {
				let id: any = answer.question;
				await NotificationController._addNotification(id);
				return AnswersController._responseSuccess(res, '00', 'Successfully Added', answer, 200);
			}
		} catch (error) {
			return AnswersController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};

	static _getAnswers = async (req: Request, res: Response) => {
		try {
			const answers: AnswerInstance[] = await db.Answer.findAll({
				order: [['id', 'DESC']],
				include: [
					{
						model: db.Upvote,
						required: false,
					},
					{
						model: db.Downvote,
						required: false,
					},
				],
			});
			return AnswersController._responseSuccess(res, '00', 'Successfully Fetched', answers, 200);
		} catch (error) {
			return AnswersController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};

	static _getOneAnswer = async (req: Request, res: Response) => {
		try {
			let query =
				'SELECT * FROM `answers` a JOIN (SELECT answer, COUNT(*) AS total_upvotes FROM upvotes GROUP BY answer) upv ON a.id = upv.answer JOIN (SELECT answer, COUNT(*) AS total_downvotes FROM downvotes GROUP BY answer) dwv ON a.id = dwv.answer LIMIT 1';

			const answer: AnswerInstance = await db.sequelize.query(query);

			return AnswersController._responseSuccess(res, '00', 'Successfully Fetched', answer, 200);
		} catch (error) {
			return AnswersController._responseError(res, 'KPT005', 'An Error Occured', error.toString(), 500);
		}
	};
}

export default AnswersController;
