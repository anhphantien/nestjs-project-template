import { Transform } from 'class-transformer';

export const TransformIntoString = () => Transform(value => {
  if (typeof value === 'string') {
    return value = value.trim();
  }
});
