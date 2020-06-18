import { Entity, Index, BeforeInsert, BeforeUpdate } from 'typeorm';
import {
  ColumnUnsignedPrimaryKey, Column32Char, Column255Char,
  ColumnTinyInt, Column64Char, ColumnTime, Column8Char,
} from '../utils/customColumns';

@Entity('user')
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

  @Column8Char()
  languageCode: string;

  @Column255Char()
  temporaryPassword: string;

  @ColumnTime()
  creationTime: Date;

  @ColumnTime()
  updateTime: Date;

  // Relationship(s)

  // Events
  @BeforeInsert()
  setCreationTime() {
    this.creationTime = new Date();
  }

  @BeforeUpdate()
  setUpdateTime() {
    this.updateTime = new Date();
  }
}
