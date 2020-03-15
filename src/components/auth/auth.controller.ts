import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto, LoginOtpVerificationDto,
  RefreshTokenDto, ForgotPasswordDto,
  LoginWithTemporaryPasswordDto, ResetPasswordDto,
} from './auth.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { usernameOrEmail, password } = body;
    return this.authService.login(usernameOrEmail, password);
  }

  @Post('loginOtpVerification')
  async loginOtpVerification(@Body() body: LoginOtpVerificationDto) {
    const { usernameOrEmail, otp } = body;
    return this.authService.loginOtpVerification(usernameOrEmail, otp);
  }

  @Post('refreshToken')
  async refreshToken(@Body() body: RefreshTokenDto) {
    const { refreshToken } = body;
    return this.authService.refreshToken(refreshToken);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    const { emailOrPhone } = body;
    return this.authService.forgotPassword(emailOrPhone);
  }

  @Post('loginWithTemporaryPassword')
  async loginWithTemporaryPassword(@Body() body: LoginWithTemporaryPasswordDto) {
    const { usernameOrEmail, temporaryPassword } = body;
    await this.authService.loginWithTemporaryPassword(usernameOrEmail, temporaryPassword);
  }

  @Post('resetPassword')
  async resetPassword(@Body() body: ResetPasswordDto) {
    const { usernameOrEmail, temporaryPassword, newPassword } = body;
    return this.authService.resetPassword(usernameOrEmail, temporaryPassword, newPassword);
  }
}
