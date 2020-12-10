/* tslint:disable: class-name */
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import moment = require('moment');

@ValidatorConstraint()
export class isArrayOfIntegers implements ValidatorConstraintInterface {
  validate(values: any[]) {
    for (const value of values) {
      if (!Number.isInteger(Number(value))) {
        return false;
      }
    }
    return true;
  }

  defaultMessage({ property }) {
    return `${property} must be an array of integers`;
  }
}

@ValidatorConstraint()
export class isDate implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      return Boolean(value.match(/[1-9]\d*-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/g) && moment(value, 'YYYY-MM-DD').isValid());
    }
  }

  defaultMessage({ property }) {
    return `${property} must be a date`;
  }
}

@ValidatorConstraint()
export class isDateTime implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      return Boolean(value.match(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/g) && moment(value).isValid());
    }
  }

  defaultMessage({ property }) {
    return `${property} must be a datetime`;
  }
}

@ValidatorConstraint()
export class isPassword implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      return Boolean(value.length >= 6);
    }
  }

  defaultMessage({ property }) {
    return `${property} must be at least 6 characters long`;
  }
}

@ValidatorConstraint()
export class isUsername implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      return Boolean(value.match(/[a-z0-9_.]{4,32}$/g));
    }
  }

  defaultMessage({ property }) {
    return `${property} must contain only lowercase letters, numbers, underscores, dots and be between 4 and 32 characters long`;
  }
}
