import { ValueTransformer } from 'typeorm';

export const DateTimestamp: ValueTransformer = {
  to: (value: Date) => {
    if (value) {
      return value.getTime();
    }
  },
  from: (value: string) => {
    if (value) {
      return new Date(Number(value));
    }
  },
};
