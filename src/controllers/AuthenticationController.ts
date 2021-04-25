import { Request, Response } from 'express';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator/check';

import BaseController from './BaseController';
import { UserService } from '../services/user.service';
import { UserInstance } from '../models/User';

import { createModels } from '../models';
const db = createModels();

const userService = new UserService();

class AuthenticationController extends BaseController {
	constructor(req: Request, res: Response) {
		super(req, res);
		this.req = req;
		this.res = res;
	}

	static _register = async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return AuthenticationController._responseError(res, 'KPT004', 'Validation failed', errors.array(), 422);
			}

			const existingUser = await db.User.findOne({
				where: { email: req.body.email },
			});

			if (existingUser) return AuthenticationController._responseError(res, 'KPT009', 'Email exists', null, 409);

			const payload = matchedData(req) as UserInstance;
			const user = userService.register(payload);

			return user.then((u) => AuthenticationController._responseSuccess(res, '00', 'Successfully Registered', u, 200));
		} catch (error) {
			return AuthenticationController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};

	static _login = async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return AuthenticationController._responseError(res, 'KPT004', 'Validation failed', errors.array(), 422);
			}

			const payload = matchedData(req) as UserInstance;
			const token = userService.login(payload);

			return token.then((t) => res.json(t));
		} catch (error) {
			return AuthenticationController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};
}

export default AuthenticationController;
