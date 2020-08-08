import { Entity, Index } from 'typeorm';
import { ColumnUnsignedPrimaryKey, Column32Char, Column255Char, ColumnTinyInt, Column64Char, CreatedAt, UpdatedAt } from '../utils';

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

  @Column32Char()
  @Index('phone', { unique: true })
  phone: string;

  @Column255Char()
  temporaryPassword: string;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}
