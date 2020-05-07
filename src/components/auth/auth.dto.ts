import { IsString, IsNotEmpty } from 'class-validator';
import { TransformIntoString } from 'src/utils/transform';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: 'superadmin' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: '123456' })
  password: string;
}

export class LoginOtpVerificationBody {
  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: 'superadmin' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: '1234' })
  otp: string;
}

export class RefreshTokenBody {
  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: '' })
  refreshToken: string;
}

export class ForgotPasswordBody {
  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: '' })
  emailOrPhone: string;
}

export class LoginWithTemporaryPasswordBody {
  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: '' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: '' })
  temporaryPassword: string;
}

export class ResetPasswordBody {
  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: '' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: '' })
  temporaryPassword: string;

  @IsString()
  @IsNotEmpty()
  @TransformIntoString()
  @ApiProperty({ example: '' })
  newPassword: string;
}
