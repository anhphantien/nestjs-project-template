import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordBody, LoginBody, RefreshTokenBody, VerifyOtpBody } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: LoginBody) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @Post('verifyOtp')
  async verifyOtp(@Body() body: VerifyOtpBody) {
    const { username, otp } = body;
    return this.authService.verifyOtp(username, otp);
  }

  @Post('refreshToken')
  async refreshToken(@Body() body: RefreshTokenBody) {
    const { refreshToken } = body;
    return this.authService.refreshToken(refreshToken);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() body: ForgotPasswordBody) {
    const { email } = body;
    return this.authService.forgotPassword(email);
  }
}
