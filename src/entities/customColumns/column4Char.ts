import { Column } from 'typeorm';

export const Column4Char = () => Column({
  type: 'varchar',
  length: 4,
  nullable: true,
});
