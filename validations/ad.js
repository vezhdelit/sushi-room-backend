import { body } from 'express-validator';

export const adCreateValidation = [
    body('imageUrl').isString(),
    body('title').isString(),

];