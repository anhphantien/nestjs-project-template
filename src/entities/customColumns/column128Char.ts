import { Column } from 'typeorm';

export const Column128Char = () => Column({
  type: 'varchar',
  length: 128,
  nullable: true,
});
