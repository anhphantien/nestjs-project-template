import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ example: '' })
  emailOrPhone: string;
}

export class LoginWithTemporaryPasswordBody {
  @IsString()
  @IsNotEmpty()
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
