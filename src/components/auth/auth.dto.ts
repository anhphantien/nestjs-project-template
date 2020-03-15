import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'superadmin' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}

export class LoginOtpVerificationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'superadmin' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1234' })
  otp: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  refreshToken: string;
}

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  emailOrPhone: string;
}

export class LoginWithTemporaryPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  temporaryPassword: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  temporaryPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  newPassword: string;
}
