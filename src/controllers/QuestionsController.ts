import { Request, Response } from 'express';
import BaseController from './BaseController';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator';
import { QuestionInstance } from '../models/Question';
import { AnswerInstance } from '../models/Answer';

import { createModels } from '../models';
const db = createModels();

class QuestionsController extends BaseController {
	constructor(req: Request, res: Response) {
		super(req, res);
		this.req = req;
		this.res = res;
	}

	static _createQuestion = async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return QuestionsController._responseError(res, 'KPT004', 'Validation failed', errors.array(), 422);

			const existingQuestion = await db.Question.findOne({
				where: req.body,
			});

			if (existingQuestion) return QuestionsController._responseError(res, 'KPT009', 'Duplicate Question', null, 409);

			const payload = matchedData(req) as QuestionInstance;
			const question: QuestionInstance = await db.Question.create(payload);

			if (question) return QuestionsController._responseSuccess(res, '00', 'Successfully Created', question, 201);
		} catch (error) {
			return QuestionsController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};

	static _getQuestions = async (req: Request, res: Response) => {
		try {
			const questions: QuestionInstance[] = await db.Question.findAll();
			return QuestionsController._responseSuccess(res, '00', 'Successfully Fetched', questions, 200);
		} catch (error) {
			return QuestionsController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};

	static _getAQuestion = async (req: Request, res: Response) => {
		try {
			const question: QuestionInstance | null = await db.Question.findOne({
				where: { id: req.params.id },
			});

			if (!question) {
				return QuestionsController._responseError(res, 'KPT004', 'Question Not Found', null, 404);
			}

			let query =
				'SELECT * FROM `answers` a LEFT JOIN (SELECT answer, COUNT(*) AS total_upvotes FROM upvotes GROUP BY answer) upv ON a.id = upv.answer LEFT JOIN (SELECT answer, COUNT(*) AS total_downvotes FROM downvotes GROUP BY answer) dwv ON a.id = dwv.answer WHERE a.question =' +
				question.id;
			const answers: AnswerInstance = await db.sequelize.query(query);

			let data = {
				question: question,
				answers: answers[0],
			};

			return QuestionsController._responseSuccess(res, '00', 'Successfully Fetched', data, 200);
		} catch (error) {
			return QuestionsController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};
}

export default QuestionsController;
