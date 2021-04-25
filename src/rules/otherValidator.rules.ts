import { body, header, param } from 'express-validator';

export const otherValidatorRules = {
  forCreateQuestion: [
    body('author', 'author (id) is required').exists().notEmpty().isNumeric(),
		body('title', 'title is required').exists().notEmpty(),
		body('text', 'text is required').exists().notEmpty(),
  ],
  forMore: [
    
  ]
}