import { IUser } from '@/common/interfaces';
import { ERROR_CODE, USER } from '@/constants';
import { User } from '@/entities';
import { UserRepository } from '@/repositories';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt = require('bcrypt');
import { generate } from 'generate-password';
import { NotificationService } from '../notification/notification.service';
import { OtpService } from './otp.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly otpService: OtpService,
    private readonly notificationService: NotificationService,
  ) { }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'username', 'passwordHash', 'role', 'status', 'email'],
      where: [{ username }, { email: username }],
    });
    this.validateUser(user);
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      throw new BadRequestException(ERROR_CODE.INVALID_PASSWORD);
    }
    if (user.role === USER.ROLE.ADMIN) {
      return this.tokenService.createToken({ id: user.id, username: user.username, role: user.role });
    }
    return this.otpService.send(user.email, { username: user.username });
  }

  async verifyOtp(username: string, otp: string) {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email: username }],
    });
    this.validateUser(user);
    await this.otpService.verify(user.email, otp);
    return this.tokenService.createToken({ id: user.id, username: user.username, role: user.role });
  }

  async refreshToken(oldRefreshToken: string) {
    const payload: IUser = await this.tokenService.decodeAccessToken(oldRefreshToken);
    if (!payload || !payload.id) {
      throw new BadRequestException(ERROR_CODE.INVALID_PAYLOAD);
    }
    const user = await this.userRepository.findOne({ id: payload.id });
    this.validateUser(user);
    await this.tokenService.deleteRefreshToken(oldRefreshToken);
    return this.tokenService.createToken({ id: user.id, username: user.username, role: user.role });
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ email });
    this.validateUser(user);
    const newPassword = generate({ length: 10, numbers: true });
    await this.notificationService.sendNewPassword(email, { username: user.username, newPassword });
    await this.userRepository.update({ id: user.id }, { passwordHash: bcrypt.hashSync(newPassword, 10) });
    return { message: 'New password has been sent!' };
  }

  private validateUser(user: User) {
    if (!user) {
      throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
    }
    if (user.status === USER.STATUS.NOT_ACTIVATED) {
      throw new UnauthorizedException(ERROR_CODE.USER_NOT_ACTIVATED);
    }
    if (user.status === USER.STATUS.IS_DISABLED) {
      throw new ForbiddenException(ERROR_CODE.DISABLED_USER);
    }
  }
}
