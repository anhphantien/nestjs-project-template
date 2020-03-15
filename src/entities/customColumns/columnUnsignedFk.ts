import { Column } from 'typeorm';

export const ColumnUnsignedForeignKey = () => Column({
  unsigned: true,
  nullable: true,
});
