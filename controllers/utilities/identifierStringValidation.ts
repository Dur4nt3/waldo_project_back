import { body } from 'express-validator';

export default function identifierStringValidation(
    targetEntity: string,
    targetField: string,
    regex: RegExp,
    minLength: number,
    maxLength: number,
    errorVar?: string,
) {
    const emptyErr = 'must not be empty';

    return body(targetField)
        .trim()
        .notEmpty()
        .withMessage(`${targetEntity} ${emptyErr}`)
        .bail()
        .matches(regex)
        .withMessage(`${targetEntity} ${errorVar}`)
        .bail()
        .isLength({ min: minLength, max: maxLength })
        .withMessage(
            // eslint-disable-next-line @stylistic/max-len
            `${targetEntity} must be between ${minLength} and ${maxLength} characters`,
        );
}
