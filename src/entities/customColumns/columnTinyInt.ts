import { Column } from 'typeorm';

export const ColumnTinyInt = () => Column({
  type: 'tinyint',
  nullable: true,
});
