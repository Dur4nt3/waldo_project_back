import { body } from 'express-validator';

const validateScreenWidth = [
    body('screenWidth')
        .trim()
        .notEmpty()
        .withMessage('Screen width cannot be empty')
        .bail()
        .isFloat({ min: 1, max: 999999 })
        .withMessage('Screen width must be between 1 and 999999'),
];

export default validateScreenWidth;