import { Column } from 'typeorm';

export const ColumnBlob = () => Column({
  type: 'mediumblob',
  nullable: true,
});
