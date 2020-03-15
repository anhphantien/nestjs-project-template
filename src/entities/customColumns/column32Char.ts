import { Column } from 'typeorm';

export const Column32Char = () => Column({
  type: 'varchar',
  length: 32,
  nullable: true,
});
