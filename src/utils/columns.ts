import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

export const Column255Char = (options = { select: true }) => Column({
  type: 'varchar',
  length: 255,
  nullable: true,
  select: options.select,
});

export const ColumnBlob = () => Column({
  type: 'blob',
  nullable: true,
});

export const ColumnBoolean = (options = { default: null }) => Column({
  type: 'boolean',
  nullable: true,
  default: options.default,
});

export const ColumnDate = () => Column({
  type: 'date',
  nullable: true,
});

export const ColumnDateTime = () => Column({
  type: 'datetime',
  nullable: true,
  precision: 0,
});

export const ColumnDecimal = (options = { precision: 255, scale: 2 }) => Column({
  type: 'double',
  nullable: true,
  precision: options.precision, // max: 255
  scale: options.scale, // max: 30
});

export const ColumnInt = () => Column({
  type: 'int',
  nullable: true,
});

export const ColumnSimpleArray = () => Column({
  type: 'simple-array',
  nullable: true,
});

export const ColumnSimpleJson = () => Column({
  type: 'simple-json',
  nullable: true,
});

export const ColumnText = () => Column({
  type: 'text',
  nullable: true,
});

export const ColumnTinyInt = (options = { default: null }) => Column({
  type: 'tinyint',
  nullable: true,
  default: options.default,
});

export const ColumnUnsignedForeignKey = () => Column({
  unsigned: true,
  nullable: true,
});

export const ColumnUnsignedPrimaryKey = () => PrimaryGeneratedColumn({
  unsigned: true,
});

export const ColumnUuid = (options = { select: true }) => Column({
  type: 'varchar',
  generated: 'uuid',
  length: 36,
  nullable: true,
  select: options.select,
});

export const CreatedAt = (options = { select: false }) => CreateDateColumn({
  type: 'datetime',
  nullable: true,
  precision: 0,
  select: options.select,
});

export const UpdatedAt = (options = { select: false }) => UpdateDateColumn({
  type: 'datetime',
  nullable: true,
  precision: 0,
  select: options.select,
});
