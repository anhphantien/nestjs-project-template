import { Column255Char, Column32Char, Column64Char, ColumnTinyInt, CreatedAt, PrimaryKeyColumn, UpdatedAt } from '@/utils';
import { Entity, Index } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryKeyColumn()
  id: number;

  @Column32Char()
  @Index('username', { unique: true })
  username: string;

  @Column255Char()
  @Index('email', { unique: true })
  email: string;

  @Column64Char({ select: false })
  passwordHash: string;

  @ColumnTinyInt()
  role: number;

  @ColumnTinyInt()
  status: number;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}
