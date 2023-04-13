import { body } from 'express-validator';

export const itemCreateValidation = [
    body('imageUrl').isString(),
    body('title').isString(),
    body('price').isNumeric(),
    body('quantity').isNumeric(),
    body('weight').isNumeric(),

    body('description').optional().isString(),
    body('compounds').isString(),
    body('category').isArray(),

];