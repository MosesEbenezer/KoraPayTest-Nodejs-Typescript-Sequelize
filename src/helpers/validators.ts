function validate(method: string) {
	switch (method) {
		case '': {
			return [
				// body('storeId', 'storeId is required').exists().notEmpty(),
			];
		}

		case '': {
			return []
		}
	}
}

export default validate;