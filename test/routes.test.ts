import request from 'supertest';
import app from '../src/app';
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

	it('should create login in a user', async () => {
		const res: any = await request(app).post('/login').send({
			email: `moseschimdike@gmail.com`,
			password: '12345678',
		});
		expect(res.body).toHaveProperty('token');
	});

  // add questions her for protected routes
	// maybe we can provision a token that will be used to access all protected routes
	// the associations. Also heck failing routes.

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

	afterAll((done) => {
		done();
	});
});
