import { Column } from 'typeorm';

export const Column64Char = () => Column({
  type: 'varchar',
  length: 64,
  nullable: true,
});
