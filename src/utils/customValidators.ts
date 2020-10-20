import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
// import currencyCodes = require('currency-codes');
import moment = require('moment');

/* @ValidatorConstraint()
export class isCurrency implements ValidatorConstraintInterface {
  validate(value: any) {
    return currencyCodes.codes().includes(value);
  }

  defaultMessage({ property }) {
    return `${property} must be a currency`;
  }
} */

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
export class isIntegerArray implements ValidatorConstraintInterface {
  validate(arr: any[]) {
    for (const ele of arr) {
      if (!Number.isInteger(Number(ele))) {
        return false;
      }
    }
    return true;
  }

  defaultMessage({ property }) {
    return `${property} must be an integer array`;
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
    return `${property} must be a string conforming to the specified constraints`;
  }
}
