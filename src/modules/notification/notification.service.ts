import { ERROR_CODE, TEMPLATE } from '@/constants';
import { TemplateRepository } from '@/repositories';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NodemailerService } from '../nodemailer/nodemailer.service';

require('dotenv').config();

@Injectable()
export class NotificationService {
  constructor(
    private readonly templateRepository: TemplateRepository,
    private readonly nodemailerService: NodemailerService,
  ) { }

  async sendOtp(email: string, otp: string) {
    const template = await this.templateRepository.findOne({ templateCode: TEMPLATE.CODE.TWO_FACTOR_AUTHENTICATION });
    if (!template) {
      throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
    }
    try {
      await this.nodemailerService.send(email, {
        subject: template.subject,
        html: template.content
          .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP, otp)
          .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP_TTL, (Number(process.env.OTP_TTL) / 60).toString()),
      });
    } catch (error) {
      if (error.message.includes('No recipients defined')) {
        throw new BadRequestException(ERROR_CODE.INVALID_EMAIL_ADDRESS);
      }
    }
  }

  async sendNewPassword(email: string, newPassword: string) {
    const template = await this.templateRepository.findOne({ templateCode: TEMPLATE.CODE.FORGOT_PASSWORD });
    if (!template) {
      throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
    }
    try {
      await this.nodemailerService.send(email, {
        subject: template.subject,
        html: template.content.replace(TEMPLATE.KEYWORDS.FORGOT_PASSWORD.NEW_PASSWORD, newPassword),
      });
    } catch (error) {
      if (error.message.includes('No recipients defined')) {
        throw new BadRequestException(ERROR_CODE.INVALID_EMAIL_ADDRESS);
      }
    }
  }
}
