import identifierStringValidation from './identifierStringValidation';

const validateName = [
    identifierStringValidation(
        'Name',
        'name',
        /^[A-Za-z0-9]+$/,
        3,
        30,
        'must only contain letters and numbers',
    ),
];

export default validateName;
