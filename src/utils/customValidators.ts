import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class IsUsername implements ValidatorConstraintInterface {
  validate(value: string) {
    if (typeof value === 'string') {
      return Boolean(value.match(/^[a-z0-9_-]{4,32}$/g));
    }
  }

  defaultMessage(value: any) {
    return `${value} must be a string conforming to the specified constraints`;
  }
}
