import { isPassword, Trim } from '@/utils';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class ChangePasswordBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @Validate(isPassword)
  @Trim()
  @ApiProperty({ example: '' })
  newPassword: string;
}
