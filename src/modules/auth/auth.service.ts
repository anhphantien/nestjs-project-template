import { IUser } from '@/common/interfaces';
import { ERROR_CODE, USER } from '@/constants';
import { User } from '@/entities';
import { UserRepository } from '@/repositories';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt = require('bcrypt');
import passwordGenerator = require('generate-password');
import { NotificationService } from '../notification/notification.service';
import { OtpService } from '../otp/otp.service';
import { TokenService } from './token.service';

require('dotenv').config();

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
    if (user.role === USER.ROLE.ADMIN) {
      return this.tokenService.createToken({ id: user.id, username: user.username, role: user.role });
    }
    const allowSend = await this.otpService.checkBeforeSend(user.email);
    if (!allowSend) {
      throw new HttpException({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        error: 'Too Many Requests',
        message: ERROR_CODE.TOO_MANY_REQUESTS_TO_RECEIVE_OTP,
      }, HttpStatus.TOO_MANY_REQUESTS);
    }
    await this.otpService.send(user.email, Number(process.env.OTP_4_DIGIT));
    return { message: 'OTP has been sent!' };
  }

  async verifyOtp(usernameOrEmail: string, otp: string) {
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
    const payload: IUser = await this.tokenService.decodeAccessTokenByRefreshToken(oldRefreshToken);
    if (!payload || !payload.id) {
      throw new BadRequestException(ERROR_CODE.INVALID_PAYLOAD);
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
    await this.notificationService.sendNewPassword(email, newPassword);
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
