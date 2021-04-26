import { Request, Response } from 'express';
import BaseController from './BaseController';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator';

import { createModels } from '../models';
import { UpvoteInstance } from 'models/Upvotes';
import { DownvoteInstance } from 'models/Downvotes';
const db = createModels();

// let upvoteCode = 'VOTE_001'

class VoteController extends BaseController {
	constructor(req: Request, res: Response) {
		super(req, res);
		this.req = req;
		this.res = res;
	}

	static _upVoteAnswer = async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return VoteController._responseError(res, 'KPT004', 'Validation failed', errors.array(), 422);

			const existingUpvote = await db.Upvote.findOne({ where: req.body });
			if (existingUpvote) return VoteController._responseError(res, 'KPT009', 'Duplicate Vote', null, 409);

			const payload = matchedData(req) as UpvoteInstance;
			const vote: UpvoteInstance = await db.Upvote.create(payload);

			if (vote) return VoteController._responseSuccess(res, '00', 'Successfully Created', vote, 200);
		} catch (error) {
			return VoteController._responseError(res, 'KPT005', 'An Error Occured', error.toString(), 500);
		}
	};

	static _downVoteAnswer = async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return VoteController._responseError(res, 'KPT004', 'Validation failed', errors.array(), 422);

			const answer = await db.Answer.findOne({ where: req.body.answer });
			if (!answer) return VoteController._responseError(res, 'KPT004', 'Answer not found', null, 404);

			const existingVote = await db.Downvote.findOne({ where: req.body });
			if (existingVote) return VoteController._responseError(res, 'KPT009', 'Duplicate Vote', null, 409);

			const payload = matchedData(req) as DownvoteInstance;
			const vote: DownvoteInstance = await db.Downvote.create(payload);

			if (vote) return VoteController._responseSuccess(res, '00', 'Successfully Created', vote, 200);
		} catch (error) {
			return VoteController._responseError(res, 'KPT005', 'An Error Occured', error.toString(), 500);
		}
	};

	static _getAnswerVotes = async (req: Request, res: Response) => {
		try {
			// const Vote: VoteInstance[] = await db.Vote.findAll({ // use raw query and write a join.
			// 	where: { question: req.params.questionId },
			// });
			return VoteController._responseSuccess(res, '00', 'Successfully Fetched', null, 200);
		} catch (error) {
			return VoteController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};
}

export default VoteController;
