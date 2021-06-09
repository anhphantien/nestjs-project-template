import { Transform } from 'class-transformer';

export const TransformIntoArrayOfNumbers = () =>
  Transform((params) => {
    const values = params.value;
    if (!values) {
      return [];
    }
    return (Array.isArray(values) ? values : values.split(',')).map(
      (value: string) => Number(value),
    );
  });

export const TransformIntoBoolean = () =>
  Transform(({ value }) => JSON.parse(value));

export const TransformIntoNumber = () =>
  Transform(({ value }) => Number(value));

export const Trim = () =>
  Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim() || null;
    }
    if (value === null) {
      return null;
    }
  });
