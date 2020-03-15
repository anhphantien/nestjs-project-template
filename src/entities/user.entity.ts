import { Entity, Index, BeforeInsert, BeforeUpdate } from 'typeorm';
import {
  ColumnUnsignedPrimaryKey, Column32Char,
  Column255Char, ColumnTinyInt,
  Column64Char, ColumnDate, ColumnTime,
} from './customColumns';

@Entity('users')
export class User {
  @ColumnUnsignedPrimaryKey()
  id: number;

  @Column32Char()
  @Index('username', { unique: true })
  username: string;

  @Column255Char()
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

  @ColumnDate()
  joinDate: string;

  @ColumnDate()
  terminationDate: string;

  @ColumnTime()
  createdTime: Date;

  @ColumnTime()
  updatedTime: Date;

  // Relationship(s)

  // Events
  @BeforeInsert()
  updateCreatedTime() {
    this.createdTime = new Date();
  }

  @BeforeUpdate()
  updateUpdatedTime() {
    this.updatedTime = new Date();
  }
}
