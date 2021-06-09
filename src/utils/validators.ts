/* tslint:disable: class-name */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import moment = require('moment');

@ValidatorConstraint()
export class isDate implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      return (
        /^[1-9]\d*-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value) &&
        moment(value, 'YYYY-MM-DD').isValid()
      );
    }
    return false;
  }

  defaultMessage({ property }) {
    return `${property} must be a valid date (Required format: YYYY-MM-DD)`;
  }
}

@ValidatorConstraint()
export class isPassword implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      return value.length >= 6;
    }
    return false;
  }

  defaultMessage({ property }) {
    return `${property} must be at least 6 characters long`;
  }
}

@ValidatorConstraint()
export class isUsername implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      return /^[a-z\d]{4,32}$/.test(value);
    }
    return false;
  }

  defaultMessage({ property }) {
    return `${property} can only contain lowercase letters, numbers and must be 4-32 characters long`;
  }
}
