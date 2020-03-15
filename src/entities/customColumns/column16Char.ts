import { Column } from 'typeorm';

export const Column16Char = () => Column({
  type: 'varchar',
  length: 16,
  nullable: true,
});
