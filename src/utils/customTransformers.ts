import { Transform } from 'class-transformer';
import _ = require('lodash');

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

export const Search = () => Transform(value => {
  if (typeof value === 'string') {
    return value.trim();
  }
});

export const TransformIntoNumber = () => Transform(value => Number(value));

export const TransformIntoBoolean = () => Transform(value => JSON.parse(value));

export const TransformIntoIntegerArray = () => Transform(value => {
  if (value) {
    const arr = [];
    for (const ele of _.uniq(value.split(','))) {
      if (Number(ele) && Number.isInteger(Number(ele))) {
        arr.push(Number(ele));
      }
    }
    return arr;
    // return _.uniq(value.split(',').map((value: string) => Number(value)));
  }
});
