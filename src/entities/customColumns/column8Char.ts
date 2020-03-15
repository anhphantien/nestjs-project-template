import { Column } from 'typeorm';

export const Column8Char = () => Column({
  type: 'varchar',
  length: 8,
  nullable: true,
});
