import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: 'superadmin' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: '123456' })
  password: string;
}

export class LoginOtpVerificationBody {
  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: 'superadmin' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: '1234' })
  otp: string;
}

export class RefreshTokenBody {
  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: '' })
  refreshToken: string;
}

export class ForgotPasswordBody {
  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: '' })
  emailOrPhone: string;
}

export class LoginWithTemporaryPasswordBody {
  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: '' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: '' })
  temporaryPassword: string;
}

export class ResetPasswordBody {
  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: '' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: '' })
  temporaryPassword: string;

  @IsString()
  @IsNotEmpty()
  @Transform(v => v ? v.trim() : null)
  @ApiProperty({ example: '' })
  newPassword: string;
}
