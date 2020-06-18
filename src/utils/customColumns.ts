import { Column, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';

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

export const Column255Char = () => Column({
  type: 'varchar',
  length: 255,
  nullable: true,
});

export const Column512Char = () => Column({
  type: 'varchar',
  length: 512,
  nullable: true,
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

export const ColumnText = () => Column({
  type: 'text',
  nullable: true,
});

export const ColumnTime = () => Column({
  type: 'bigint',
  unsigned: true,
  nullable: true,
  transformer: Timestamp,
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

export const Timestamp: ValueTransformer = {
  to: (value: Date) => {
    if (value) {
      if (typeof value === 'number') {
        return value;
      }
      return value.getTime();
    }
  },
  from: (value: string) => {
    if (value) {
      return new Date(Number(value));
    }
  },
};
