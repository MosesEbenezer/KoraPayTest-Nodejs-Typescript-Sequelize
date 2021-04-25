import { Request, Response } from 'express';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator/check';

import BaseController from './BaseController';
import { UserService } from '../services/user.service';
import { UserInstance } from '../models/User';

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
				return AuthenticationController._responseError(res, 'ECS004', 'Validation failed', errors.array(), 422);
			}

			const payload = matchedData(req) as UserInstance;
			const user = userService.register(payload);

			return user.then((u) => res.json(u));
		} catch (error) {
			return AuthenticationController._responseError(res, 'ECS005', 'An Error Occured', error, 500);
		}
	};

	static _login = async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return AuthenticationController._responseError(res, 'ECS004', 'Validation failed', errors.array(), 422);
			}

			const payload = matchedData(req) as UserInstance;
			const token = userService.login(payload);

			return token.then((t) => res.json(t));
		} catch (error) {
			return AuthenticationController._responseError(res, 'ECS005', 'An Error Occured', error, 500);
		}
	};
}

export default AuthenticationController;
