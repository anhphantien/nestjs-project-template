import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from '../../utils/customTransformers';

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'superadmin' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}

export class LoginOtpVerificationBody {
  @IsString()
  @IsNotEmpty()
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

export class LoginWithTemporaryPasswordBody {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: '' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  temporaryPassword: string;
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
  temporaryPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  newPassword: string;
}
