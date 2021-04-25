import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import swaggerUi from 'swagger-ui-express';

import { createModels } from './models';
import Route from './routes/api.route';
import { tokenGuard } from './middlewares/token-guard'

// const swaggerFile = import('../swagger_output.json');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// declare server variables
const app = express();
const PORT = process.env.PORT || 3000;
const atlasUrl = process.env.atlasUrl;

class Server {
	constructor() {
		this.initDB();
		this.initExpressMiddleware();
		this.initRoutes();
		// this.initSwagger();
		this.start();
	}

	start() {
		app.listen(PORT, () => {
			console.log('Server is up and running');
		});
	}

	initExpressMiddleware() {
		app.use(express.json({ limit: '20mb' }));
		app.use(express.urlencoded({ extended: false, limit: '20mb' }));
		app.use(morgan('dev'));
		app.use(cors());

		// allow cross-origin requests
		app.use(function (req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			next();
		});
	}

	initRoutes() {
		app.use('/', Route);
	}

	// initSwagger() {
	// 	app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
	// }

	initDB() {
    const db = createModels();
		db.sequelize.sync().then(() => {
			console.log(`Successfully connected to the database`);
		});
	}
}

new Server();
