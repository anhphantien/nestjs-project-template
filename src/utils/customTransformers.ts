import { Transform } from 'class-transformer';

export const Trim = () => Transform(value => {
  if (typeof value === 'string') {
    return value.trim();
  }
});

export const TransformIntoNumber = () => Transform(value => Number(value));

export const TransformIntoBoolean = () => Transform(value => JSON.parse(value));
