import { IsString, IsNotEmpty, IsEmail, Validate } from 'class-validator';
import { Trim } from '../../utils/customTransformers';
import { ApiProperty } from '@nestjs/swagger';
import { isPassword } from '../../utils';

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: 'superadmin' })
  usernameOrEmail: string;

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
  usernameOrEmail: string;

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
  usernameOrEmail: string;

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
