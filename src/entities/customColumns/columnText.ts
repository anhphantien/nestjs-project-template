import { Column } from 'typeorm';

export const ColumnText = () => Column({
  type: 'text',
  nullable: true,
});
