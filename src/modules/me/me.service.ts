import { ERROR_CODE } from '@/constants';
import { UserRepository } from '@/repositories';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import bcrypt = require('bcrypt');

@Injectable()
export class MeService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async getMe(userId: number) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
    }
    return user;
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    if (newPassword === currentPassword) {
      throw new BadRequestException(ERROR_CODE.NEW_PASSWORD_MUST_BE_DIFFERENT_FROM_CURRENT_PASSWORD);
    }
    const user = await this.userRepository.findOne({
      select: ['id', 'passwordHash'],
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
    }
    if (!user.passwordHash) {
      throw new InternalServerErrorException(ERROR_CODE.PASSWORD_HASH_NOT_FOUND);
    }
    if (!bcrypt.compareSync(currentPassword, user.passwordHash)) {
      throw new BadRequestException(ERROR_CODE.INVALID_PASSWORD);
    }
    await this.userRepository.update({ id: user.id }, { passwordHash: bcrypt.hashSync(newPassword, 10) });
    return { message: 'Password has been reset successfully!' };
  }
}
