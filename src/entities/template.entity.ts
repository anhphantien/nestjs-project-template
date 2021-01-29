import { Column255Char, Column64Char, Column8Char, ColumnText, CreatedAt, PrimaryKeyColumn, UpdatedAt } from '@/utils';
import { Entity, Index } from 'typeorm';

@Entity('Template')
export class Template {
  @PrimaryKeyColumn()
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
