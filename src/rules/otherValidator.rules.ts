import { body, header, param } from 'express-validator';

export const otherValidatorRules = {
  createQuestion: [
    body('author', 'author (id) is required').exists().notEmpty().isNumeric(),
		body('title', 'title is required').exists().notEmpty(),
		body('text', 'text is required').exists().notEmpty(),
  ],
  addAnswer: [
    body('author', 'author (id) is required').exists().notEmpty().isNumeric(),
		body('question', 'question (id) is required').exists().notEmpty().isNumeric(),
		body('text', 'text is required').exists().notEmpty(),
  ],
  addSubscription: [
    body('user', 'user (id) is required').exists().notEmpty().isNumeric(),
		body('question', 'question (id) is required').exists().notEmpty().isNumeric(),
  ]
}