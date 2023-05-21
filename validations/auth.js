import { body } from 'express-validator';

export const loginValidation = [body('email').isEmail(), body('password').isLength({ min: 8 })];

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('fullName').isLength({ min: 2 }),
  body('phoneNumber').isMobilePhone(),
  body('favourites').optional(),
];
