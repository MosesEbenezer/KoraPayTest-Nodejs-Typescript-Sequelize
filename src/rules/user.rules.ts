import * as bcrypt from 'bcrypt'
import { check } from 'express-validator/check'

import { createModels } from '../models';
const db = createModels();

// import { UserInstance } from '../models/User'

export const userRules = {
  forRegister: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom(email => db.User.find({ where: { email } }).then(u => !!!u)).withMessage('Email exists'),
    check('password')
      .isLength({ min: 8 }).withMessage('Invalid password'),
    check('confirmPassword')
      .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Passwords are different')
  ],
  forLogin: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom(email => db.User.findOne({ where: { email } }).then(u => !!u)).withMessage('Invalid email or password'),
    check('password')
      .custom((password, { req }) => {
        return db.User.findOne({ where: { email: req.body.email } })
          .then(u => bcrypt.compare(password, u!.password))
      }).withMessage('Invalid email or password')
  ]
}