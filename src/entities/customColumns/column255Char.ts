import { Column } from 'typeorm';

export const Column255Char = () => Column({
  type: 'varchar',
  length: 255,
  nullable: true,
});
