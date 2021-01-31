import { Trim } from '@/utils';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
