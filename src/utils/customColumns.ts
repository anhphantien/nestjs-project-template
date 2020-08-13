import { Column, PrimaryGeneratedColumn, ValueTransformer, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export const Column4Char = () => Column({
  type: 'varchar',
  length: 4,
  nullable: true,
});

export const Column8Char = () => Column({
  type: 'varchar',
  length: 8,
  nullable: true,
});

export const Column16Char = () => Column({
  type: 'varchar',
  length: 16,
  nullable: true,
});

export const Column32Char = () => Column({
  type: 'varchar',
  length: 32,
  nullable: true,
});

export const Column64Char = () => Column({
  type: 'varchar',
  length: 64,
  nullable: true,
});

export const Column128Char = () => Column({
  type: 'varchar',
  length: 128,
  nullable: true,
});

export const Column255Char = (option = { select: true }) => Column({
  type: 'varchar',
  length: 255,
  nullable: true,
  select: option.select,
});

export const ColumnBlob = () => Column({
  type: 'mediumblob',
  nullable: true,
});

export const ColumnBoolean = () => Column({
  type: 'boolean',
  nullable: true,
});

export const ColumnDate = () => Column({
  type: 'date',
  nullable: true,
});

export const ColumnDateTime = () => Column({
  type: 'datetime',
  precision: 0,
  nullable: true,
});

export const ColumnDecimal = () => Column({
  type: 'double',
  nullable: true,
  precision: 255,
  scale: 2,
});

export const ColumnJSON = () => Column({
  type: 'text',
  nullable: true,
  transformer: StringObject,
});

export const ColumnSmallInt = () => Column({
  type: 'smallint',
  nullable: true,
});

export const ColumnText = () => Column({
  type: 'text',
  nullable: true,
});

export const ColumnTinyInt = () => Column({
  type: 'tinyint',
  nullable: true,
});

export const ColumnUnsignedForeignKey = () => Column({
  unsigned: true,
  nullable: true,
});

export const ColumnUnsignedPrimaryKey = () => PrimaryGeneratedColumn({
  unsigned: true,
});

export const CreatedAt = (option = { select: false }) => CreateDateColumn({
  type: 'datetime',
  nullable: true,
  precision: 0,
  select: option.select,
});

export const UpdatedAt = (option = { select: false }) => UpdateDateColumn({
  type: 'datetime',
  nullable: true,
  precision: 0,
  select: option.select,
});

export const StringObject: ValueTransformer = {
  to: (value: string) => {
    if (value) {
      if (typeof value === 'string') {
        return JSON.stringify(JSON.parse(value));
      }
      return JSON.stringify(value);
    }
  },
  from: (value: string) => {
    if (value) {
      return JSON.parse(value);
    }
  },
};
