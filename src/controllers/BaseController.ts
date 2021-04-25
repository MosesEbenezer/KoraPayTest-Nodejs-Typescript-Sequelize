import { Request, Response } from 'express';

class BaseController {
	req: any;
	res: Response<any, Record<string, any>>;
	constructor(req: Request, res: Response) {
		this.req = req;
		this.res = res;
	}

	/** handle response errors */
	static _responseError = (res: Response, res_code: string, res_des: string, error: object | null, code: number) => {
		res.status(code).json({
			success: false,
			response_code: `${res_code}`,
			response_description: `${res_des}`,
			error: error,
		});
	};

	/** handle successful response */
	static _responseSuccess = (res: Response, res_code: string, res_des: string, data: object | null, code: number) => {
		res.status(code).json({
			success: true,
			response_code: `${res_code}`,
			response_description: `${res_des}`,
			data,
		});
	};
}

export default BaseController;
