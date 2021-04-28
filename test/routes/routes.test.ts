import request from 'supertest';
import app from '../../src/app';
import * as faker from 'faker';

describe('User API', () => {
	beforeAll((done) => {
		done();
	});

	it('should create a new user', async () => {
		const randomString = faker.random.alphaNumeric(10);
		const res: any = await request(app)
			.post('/register')
			.send({
				email: `moseschimdike@gmail.com`,
				password: '12345678',
				confirmPassword: '12345678',
			})
			.send({
				email: `${randomString}@gmail.com`,
				password: '12345678',
				confirmPassword: '12345678',
			});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('data');
	});

	let token: any = '';

	it('should create login in a user', async () => {
		const res: any = await request(app).post('/login').send({
			email: `moseschimdike@gmail.com`,
			password: '12345678',
		});
		expect(res.body).toHaveProperty('token');
		token = res.body.token;
	});

	it('should add a new question', async () => {
		const randomString = faker.name.findName();
		const res: any = await request(app).post('/question').set('token', token).send({
			author: Math.random(),
			title: randomString,
			text: randomString,
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('data');
	});

	it('should add a new answer', async () => {
		const randomString = faker.name.findName();
		const res: any = await request(app).post('/answer').set('token', token).send({
			author: Math.random(),
			question: Math.random(),
			text: randomString,
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('data');
	});

	it('should upvote an answer', async () => {
		const res: any = await request(app)
			.post('/answer/upvote')
			.set('token', token)
			.send({
				user: Math.random(),
				answer: Math.random(),
			})
			.send({
				user: Math.random(),
				answer: Math.random(),
			})
			.send({
				user: Math.random(),
				answer: Math.random(),
			});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('data');
	});

	it('should downvote an answer', async () => {
		const res: any = await request(app).post('/answer/downvote').set('token', token).send({
			user: Math.random(),
			answer: Math.random(),
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('data');
	});

	it('should get questions', async () => {
		const res: any = await request(app).get('/questions');
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('data');
	});

	it('should get a question', async () => {
		const res: any = await request(app).get('/question/1');
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('data');
	});

	it('should get an Answer', async () => {
		const res: any = await request(app).get('/answer/1');
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('data');
	});

	it('should subscribe to a question', async () => {
		const res: any = await request(app)
		.post('/subscribe/1')
		.set('token', token)
		.send({
			user: Math.random(),
			question: 1,
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('data');
	});


	it('should get all subscriptions for a question', async () => {
		const res: any = await request(app).get('/subscriptions/1').set('token', token);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('data');
	});

	it('should get all notifications for a user', async () => {
		const res: any = await request(app).get('/notifications/1').set('token', token);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('data');
	});

	afterAll((done) => {
		done();
	});
});
