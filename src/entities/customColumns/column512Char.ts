import { Column } from 'typeorm';

export const Column512Char = () => Column({
  type: 'varchar',
  length: 512,
  nullable: true,
});
