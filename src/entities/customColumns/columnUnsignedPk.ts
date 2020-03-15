import { PrimaryGeneratedColumn } from 'typeorm';

export const ColumnUnsignedPrimaryKey = () => PrimaryGeneratedColumn({
  unsigned: true,
});
