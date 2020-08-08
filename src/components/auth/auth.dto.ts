import { IsString, IsNotEmpty } from 'class-validator';
import { Trim } from '../../utils/customTransformers';
import { ApiProperty } from '@nestjs/swagger';

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

export class OtpVerificationBody {
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
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: '' })
  emailOrPhone: string;
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
  @ApiProperty({ example: '' })
  newPassword: string;
}
