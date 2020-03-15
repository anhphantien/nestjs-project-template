import { Column } from 'typeorm';
import { DateTimestamp } from '../valueTransformers/dateTimestamp';

export const ColumnTime = () => Column({
  type: 'bigint',
  unsigned: true,
  nullable: true,
  transformer: DateTimestamp,
});
