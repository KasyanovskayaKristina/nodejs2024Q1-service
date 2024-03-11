import { ValidationError } from 'class-validator';

export const formatValidationErrors = (errors: ValidationError[]): string => {
  const errorMessagePrefix = 'Validation failed: ';
  const errorMessages = errors.map((error) => {
    const constraints = error.constraints
      ? Object.values(error.constraints).join('. ')
      : '';
    const property = error.property ? `Property ${error.property}: ` : '';
    return `${property}${constraints}`;
  });

  return errorMessagePrefix + errorMessages.join('. ') + '.';
};
/*
export const buildValidationErrMsg = (errList: ValidationError[]) => {
  return errList.reduce((acc, curr, i) => {
    let str = Object.values(curr.constraints).join(', ');
    if (i < errList.length - 1) {
      str = str.concat(', ');
    } else {
      str = str.concat('.');
    }
    return acc.concat(str);
  }, 'You are trying to pass invalid object for such operation. Here is list of errors made: ');
};
*/
