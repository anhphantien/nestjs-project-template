import { ValueTransformer } from 'typeorm';

export const Timestamp: ValueTransformer = {
  to: (value: Date) => {
    if (value) {
      if (typeof value === 'number') {
        return value;
      }
      return value.getTime();
    }
  },
  from: (value: string) => {
    if (value) {
      return new Date(Number(value));
    }
  },
};
