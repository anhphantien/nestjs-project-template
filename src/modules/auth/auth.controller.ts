import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordBody, LoginBody, RefreshTokenBody, VerifyOtpBody } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() body: LoginBody) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @Post('verifyOtp')
  verifyOtp(@Body() body: VerifyOtpBody) {
    const { username, otp } = body;
    return this.authService.verifyOtp(username, otp);
  }

  @Post('refreshToken')
  refreshToken(@Body() body: RefreshTokenBody) {
    const { refreshToken } = body;
    return this.authService.refreshToken(refreshToken);
  }

  @Post('forgotPassword')
  forgotPassword(@Body() body: ForgotPasswordBody) {
    const { email } = body;
    return this.authService.forgotPassword(email);
  }
}
