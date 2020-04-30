import { Injectable, NotFoundException, UnauthorizedException, HttpException, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../repositories';
import { TokenService } from './token.service';
import { OtpService } from '../../global_modules/otp/otp.service';
import { NotificationService } from '../../common/modules/notification/notification.service';
import { User } from '../../entities';
import * as bcrypt from 'bcrypt';
import { ERROR_CODE } from '../../constants/error';
import { USER } from '../../constants';
import config from '../../config';
import * as passwordGenerator from 'generate-password';

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
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    this.checkUser(user);
    const validPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!validPassword) {
      throw new UnauthorizedException(ERROR_CODE.INVALID_PASSWORD);
    }
    if (user.role === USER.ROLE.SUPER_ADMIN) {
      return this.tokenService.createToken({ id: user.id, username: user.username, role: user.role });
    }
    const canSendOtp = await this.otpService.canSend(user.email || user.phone);
    if (!canSendOtp) {
      throw new HttpException({
        statusCode: 429,
        error: ERROR_CODE.TOO_MANY_REQUESTS,
        message: ERROR_CODE.TOO_MANY_REQUESTS_TO_RECEIVE_OTP,
      }, 429);
    }
    try {
      await this.otpService.send(user, Number(config.OTP_4_DIGIT));
      return {
        otpTimeToLive: Number(config.OTP_TIME_TO_LIVE),
        otpTimeToResend: Number(config.OTP_TIME_TO_RESEND),
        recipient: user.email || user.phone,
        message: 'OTP has been sent!',
      };
    } catch (error) {
      if (error.response.message === ERROR_CODE.TEMPLATE_NOT_FOUND) {
        throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
      }
      if (error.message.includes('No recipients defined')) {
        throw new BadRequestException(ERROR_CODE.INVALID_EMAIL_ADDRESS);
      }
      if (error.message.includes('not a valid phone number')) {
        throw new BadRequestException(ERROR_CODE.INVALID_PHONE_NUMBER);
      }
    }
  }

  async otpVerification(usernameOrEmail: string, otp: string) {
    const user = await this.userRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    this.checkUser(user);
    const validOtp = await this.otpService.verify(user.email || user.phone, otp);
    if (!validOtp) {
      throw new BadRequestException(ERROR_CODE.INVALID_OTP);
    }
    let payload: any = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    if (user.email) {
      payload.email = user.email;
    } else {
      payload.phone = user.phone;
    }
    return this.tokenService.createToken(payload);
  }

  async refreshToken(oldRefreshToken: string) {
    const data = await this.tokenService.decodeAccessTokenByRefreshToken(oldRefreshToken);
    if (!data.id) {
      throw new BadRequestException(ERROR_CODE.INVALID_DECODED_ACCESS_TOKEN);
    }
    const user = await this.userRepository.findOne({ id: data.id });
    this.checkUser(user);
    await this.tokenService.deleteRefreshToken(oldRefreshToken);
    return this.tokenService.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  }

  async forgotPassword(emailOrPhone: string) {
    const user = await this.userRepository.findOne({
      where: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });
    this.checkUser(user);
    const temporaryPassword = passwordGenerator.generate({ length: 10, numbers: true });
    try {
      await this.notificationService.temporaryPasswordNotification({ email: user.email, phone: user.phone }, temporaryPassword);
      await this.userRepository.update({ id: user.id }, { temporaryPassword: bcrypt.hashSync(temporaryPassword, 10) });
      return {
        recipient: emailOrPhone,
        message: 'Temporary password has been sent!',
      };
    } catch (error) {
      if (error.response.message === ERROR_CODE.TEMPLATE_NOT_FOUND) {
        throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
      }
      if (error.message.includes('No recipients defined')) {
        throw new BadRequestException(ERROR_CODE.INVALID_EMAIL_ADDRESS);
      }
      if (error.message.includes('not a valid phone number')) {
        throw new BadRequestException(ERROR_CODE.INVALID_PHONE_NUMBER);
      }
    }
  }

  async loginWithTemporaryPassword(usernameOrEmail: string, temporaryPassword: string) {
    const user = await this.userRepository.findOne({ where: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    this.checkUser(user);
    const validPassword = bcrypt.compareSync(temporaryPassword, user.temporaryPassword);
    if (!validPassword) {
      throw new UnauthorizedException(ERROR_CODE.INVALID_PASSWORD);
    }
  }

  async resetPassword(usernameOrEmail: string, temporaryPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({ where: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    this.checkUser(user);
    const validPassword = bcrypt.compareSync(temporaryPassword, user.temporaryPassword);
    if (!validPassword) {
      throw new UnauthorizedException(ERROR_CODE.INVALID_PASSWORD);
    }
    await this.userRepository.update({ id: user.id }, { passwordHash: bcrypt.hashSync(newPassword, 10), temporaryPassword: null });
    return { message: 'Password has been reset successfully!' };
  }

  private checkUser(user: User) {
    if (!user) {
      throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
    }
    if (user.status === USER.STATUS.INACTIVE) {
      throw new UnauthorizedException(ERROR_CODE.INACTIVE_USER);
    }
  }
}
