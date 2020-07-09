import { Entity, Index, BeforeInsert, BeforeUpdate } from 'typeorm';
import {
  ColumnUnsignedPrimaryKey, Column8Char, Column64Char,
  Column255Char, ColumnText, Column512Char, ColumnTime,
} from '../utils';

@Entity('template')
export class Template {
  @ColumnUnsignedPrimaryKey()
  id: number;

  @Column8Char()
  languageCode: string;

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
  creationTime: Date;

  @ColumnTime()
  updateTime: Date;

  @BeforeInsert()
  setCreationTime() {
    this.creationTime = new Date();
  }

  @BeforeUpdate()
  setUpdateTime() {
    this.updateTime = new Date();
  }
}
