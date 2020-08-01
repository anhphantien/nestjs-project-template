import { Entity, Index } from 'typeorm';
import { ColumnUnsignedPrimaryKey, Column8Char, Column64Char, Column255Char, ColumnText, CreatedAt, UpdatedAt } from '../utils';

@Entity('Template')
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

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}
