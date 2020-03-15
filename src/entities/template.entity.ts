import { Entity, Index } from 'typeorm';
import {
  ColumnUnsignedPrimaryKey, Column64Char,
  Column255Char, ColumnText,
  Column512Char, ColumnTime,
} from './customColumns';

@Entity('templates')
export class Template {
  @ColumnUnsignedPrimaryKey()
  id: number;

  @Column64Char()
  @Index('templateCode', { unique: true })
  templateCode: string;

  @Column255Char()
  subject: string;

  @ColumnText()
  content: string;

  @Column512Char()
  description: string;

  @ColumnTime()
  createdTime: Date;

  @ColumnTime()
  updatedTime: Date;
}
