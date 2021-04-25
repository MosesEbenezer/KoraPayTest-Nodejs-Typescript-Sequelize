import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as Bluebird from 'Bluebird';
import {
	// User, UserModel, UserInstance, UserViewModel
	UserInstance,
} from '../models/User';

import { createModels } from '../models';
const db = createModels();

export class UserService {
	private readonly _saltRounds = 12;
	private readonly _jwtSecret = '440.tppyqj3n9noo';

	static get userAttributes() {
		return ['id', 'email'];
	}
	private static _user: import('Bluebird')<UserInstance | null>;
	static get user() {
		return UserService._user;
	}

	register({ email, password }: UserInstance) {
		return bcrypt.hash(password, this._saltRounds).then((hash) => {
			return db.User.create({ email, password: hash }).then((u) => this.getUserById(u!.id));
		});
	}

	login({ email }: UserInstance) {
		return db.User.findOne({ where: { email } }).then((u) => {
			const { id, email } = u!;
			return { token: jwt.sign({ id, email }, this._jwtSecret) };
		});
	}

	verifyToken(token: string) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, this._jwtSecret, (err, decoded) => {
				if (err) {
					resolve(false);
					return;
				}

				UserService._user = db.User.findById(decoded!['id']);
				resolve(true);
				return;
			});
		}) as Promise<boolean>;
	}

	getUserById(id: number | undefined) {
		return (db.User.findById(id, {
			attributes: UserService.userAttributes,
		}) as unknown) as Bluebird<UserInstance>;
	}
}
