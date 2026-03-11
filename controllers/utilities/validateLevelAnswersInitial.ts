import { body } from 'express-validator';

const idError = 'Invalid id format!';

const validateLevelAnswersInitial = [
    body('levelId').isInt().withMessage(idError),

    body('locations').isArray().withMessage('Invalid answer format!'),

    body('locations.*.characterId')
        .exists()
        .withMessage('Answers must include the character ID!')
        .bail()
        .isInt()
        .withMessage(idError),

    body('locations.*.pctX')
        .exists()
        .withMessage('Answers must include the x coordinate!')
        .bail()
        .isFloat({ min: 0, max: 1 })
        .withMessage('Invalid x coordinate!'),

    body('locations.*.pctY')
        .exists()
        .withMessage('Answers must include the y coordinate')
        .bail()
        .isFloat({ min: 0, max: 1 })
        .withMessage('Invalid y coordinate'),
];

export default validateLevelAnswersInitial;
