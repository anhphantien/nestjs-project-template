import { Column255Char, Column32Char, Column64Char, ColumnTinyInt, ColumnUnsignedPrimaryKey, CreatedAt, UpdatedAt } from '@/utils';
import { Entity, Index } from 'typeorm';

@Entity('User')
export class User {
  @ColumnUnsignedPrimaryKey()
  id: number;

  @Column32Char()
  @Index('username', { unique: true })
  username: string;

  @Column255Char({ select: false })
  passwordHash: string;

  @ColumnTinyInt()
  status: number;

  @ColumnTinyInt()
  role: number;

  @Column64Char()
  @Index('email', { unique: true })
  email: string;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}
