import { Transform } from 'class-transformer';

export const TransformIntoArrayOfIntegers = () => Transform(values => {
  if (!values) {
    return [];
  }
  return values.split(',').map((value: string) => Number(value));
});

export const TransformIntoBoolean = () => Transform(value => JSON.parse(value));

export const TransformIntoNumber = () => Transform(value => Number(value));

export const Trim = () => Transform(value => {
  if (typeof value === 'string') {
    if (value.trim() === '') {
      return null;
    }
    return value.trim();
  }
  if (value === null) {
    return null;
  }
});
