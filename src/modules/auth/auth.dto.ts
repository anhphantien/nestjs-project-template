import { isPassword, Trim } from '@/utils';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: 'superadmin' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}

export class VerifyOtpBody {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: 'superadmin' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: '1234' })
  otp: string;
}

export class RefreshTokenBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  refreshToken: string;
}

export class ForgotPasswordBody {
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: '' })
  email: string;
}

export class ResetPasswordBody {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: '' })
  username: string;

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
