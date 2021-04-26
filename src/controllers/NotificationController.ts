import { Request, Response } from 'express';
import BaseController from './BaseController';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator';

import { createModels } from '../models';
import { NotificationInstance } from 'models/Notification';
const db = createModels();

class NotificationController extends BaseController {
	constructor(req: Request, res: Response) {
		super(req, res);
		this.req = req;
		this.res = res;
	}

	static _addNotification = async (question: number) => {
		try {
			const subscribers = await db.Subscription.findAll({ where: { question: question } });

			if (subscribers.length == 0) return;

			subscribers.map(async (subscriber, index) => {
				let notification: NotificationInstance = await db.Notification.create({
					message: 'A Question you subscribed to has been answered',
					user: subscriber.user,
					question: question,
				});

				if (notification && index == subscribers.length - 1) console.log('Notifications sent');
				return true;
			});
		} catch (error) {
			return error.toString();
		}
	};

	static _getUserNotifications = async (req: Request, res: Response) => {
		try {
			const notification: NotificationInstance[] = await db.Notification.findAll({
				where: { user: req.params.userId },
			});
			return NotificationController._responseSuccess(res, '00', 'Successfully Fetched', notification, 200);
		} catch (error) {
			return NotificationController._responseError(res, 'KPT005', 'An Error Occured', error, 500);
		}
	};
}

export default NotificationController;
