import { Column } from 'typeorm';
import { Timestamp } from '../valueTransformers/timestamp';

export const ColumnTime = () => Column({
  type: 'bigint',
  unsigned: true,
  nullable: true,
  transformer: Timestamp,
});
