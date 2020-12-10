import { Injectable, NotFoundException, UnauthorizedException, HttpException, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../repositories';
import { TokenService } from './token.service';
import { OtpService } from '../otp/otp.service';
import { NotificationService } from '../notification/notification.service';
import { User } from '../../entities';
import bcrypt = require('bcrypt');
import { ERROR_CODE } from '../../constants';
import { USER } from '../../constants';
require('dotenv').config();
import passwordGenerator = require('generate-password');

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly otpService: OtpService,
    private readonly notificationService: NotificationService,
  ) { }

  async login(usernameOrEmail: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'username', 'passwordHash', 'status', 'role', 'email'],
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    this.checkUser(user);
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      throw new UnauthorizedException(ERROR_CODE.INVALID_PASSWORD);
    }
    if (user.role === USER.ROLE.SUPER_ADMIN) {
      return this.tokenService.createToken({ id: user.id, username: user.username, role: user.role });
    }
    const canSendOtp = await this.otpService.canSend(user.email);
    if (!canSendOtp) {
      throw new HttpException({
        statusCode: 429,
        error: 'Too Many Requests',
        message: ERROR_CODE.TOO_MANY_REQUESTS_TO_RECEIVE_OTP,
      }, 429);
    }
    await this.otpService.send(user.email, Number(process.env.OTP_4_DIGIT));
    return { message: 'OTP has been sent!' };
  }

  async otpVerification(usernameOrEmail: string, otp: string) {
    const user = await this.userRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    this.checkUser(user);
    const validOtp = await this.otpService.verify(user.email, otp);
    if (!validOtp) {
      throw new BadRequestException(ERROR_CODE.INVALID_OTP);
    }
    return this.tokenService.createToken({ id: user.id, username: user.username, role: user.role });
  }

  async refreshToken(oldRefreshToken: string) {
    const payload = await this.tokenService.decodeAccessTokenByRefreshToken(oldRefreshToken);
    if (!payload.id) {
      throw new BadRequestException(ERROR_CODE.INVALID_DECODED_ACCESS_TOKEN);
    }
    const user = await this.userRepository.findOne({ id: payload.id });
    this.checkUser(user);
    await this.tokenService.deleteRefreshToken(oldRefreshToken);
    return this.tokenService.createToken({ id: user.id, username: user.username, role: user.role });
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ email });
    this.checkUser(user);
    const newPassword = passwordGenerator.generate({ length: 10, numbers: true });
    await this.notificationService.newPasswordNotification(email, newPassword);
    await this.userRepository.update({ id: user.id }, { passwordHash: bcrypt.hashSync(newPassword, 10) });
    return { message: 'New password has been sent!' };
  }

  async resetPassword(usernameOrEmail: string, currentPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'passwordHash', 'status'],
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    this.checkUser(user);
    if (!bcrypt.compareSync(currentPassword, user.passwordHash)) {
      throw new UnauthorizedException(ERROR_CODE.INVALID_PASSWORD);
    }
    await this.userRepository.update({ id: user.id }, { passwordHash: bcrypt.hashSync(newPassword, 10) });
    return { message: 'Password has been reset successfully!' };
  }

  private checkUser(user: User) {
    if (!user) {
      throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
    }
    if (user.status === USER.STATUS.NOT_ACTIVATED) {
      throw new UnauthorizedException(ERROR_CODE.USER_NOT_ACTIVATED);
    }
  }
}
