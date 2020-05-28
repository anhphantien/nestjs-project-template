import { Column } from 'typeorm';
import { Timestamp } from '../valueTransformers';

export const ColumnTime = () => Column({
  type: 'bigint',
  unsigned: true,
  nullable: true,
  transformer: Timestamp,
});
