import { Column32Char, ColumnText, CreatedAt, PrimaryKeyColumn, UpdatedAt } from '@/utils';
import { Entity, Index } from 'typeorm';

@Entity('Template')
export class Template {
  @PrimaryKeyColumn()
  id: number;

  @Column32Char()
  @Index('templateCode', { unique: true })
  templateCode: string;

  @ColumnText()
  subject: string;

  @ColumnText()
  content: string;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}
