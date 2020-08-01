import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBody, OtpVerificationBody, RefreshTokenBody, ForgotPasswordBody, ResetPasswordBody } from './auth.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: LoginBody) {
    const { usernameOrEmail, password } = body;
    return this.authService.login(usernameOrEmail, password);
  }

  @Post('otpVerification')
  async otpVerification(@Body() body: OtpVerificationBody) {
    const { usernameOrEmail, otp } = body;
    return this.authService.otpVerification(usernameOrEmail, otp);
  }

  @Post('refreshToken')
  async refreshToken(@Body() body: RefreshTokenBody) {
    const { refreshToken } = body;
    return this.authService.refreshToken(refreshToken);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() body: ForgotPasswordBody) {
    const { emailOrPhone } = body;
    return this.authService.forgotPassword(emailOrPhone);
  }

  @Post('resetPassword')
  async resetPassword(@Body() body: ResetPasswordBody) {
    const { usernameOrEmail, temporaryPassword, newPassword } = body;
    return this.authService.resetPassword(usernameOrEmail, temporaryPassword, newPassword);
  }
}
