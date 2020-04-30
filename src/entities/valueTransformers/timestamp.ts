import { ValueTransformer } from 'typeorm';

export const Timestamp: ValueTransformer = {
  to: (value: Date) => {
    if (value instanceof Date) {
      return value.getTime();
    }
    if (typeof value === 'number') {
      return value;
    }
  },
  from: (value: string) => {
    if (value) {
      return new Date(Number(value));
    }
  },
};
