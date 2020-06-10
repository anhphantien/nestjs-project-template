import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class isUsername implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      return Boolean(value.match(/^[a-z0-9_.]{4,32}$/g));
    }
  }

  defaultMessage({ property }) {
    return `${property} must be a string conforming to the specified constraints`;
  }
}
