import { Column } from 'typeorm';

export const ColumnBoolean = () => Column({
  type: 'boolean',
  nullable: true,
});
