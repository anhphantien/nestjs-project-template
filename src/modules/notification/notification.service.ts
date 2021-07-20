import { ERROR_CODE, OTP_TTL, TEMPLATE } from '@/constants';
import { TemplateRepository } from '@/repositories';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly templateRepository: TemplateRepository,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async sendOtp(email: string, payload: { username: string; otp: string }) {
    const template = await this.templateRepository.findOne({
      templateCode: TEMPLATE.CODE.TWO_FACTOR_AUTHENTICATION,
    });
    if (!template) {
      throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
    }
    try {
      await this.nodemailerService.send(email, {
        subject: template.subject,
        html: template.content
          .replace(
            TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.USERNAME,
            payload.username,
          )
          .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP, payload.otp)
          .replace(
            TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP_TTL,
            (OTP_TTL / 60).toString(),
          ),
      });
    } catch (error) {
      if (error.message.includes('No recipients defined')) {
        throw new BadRequestException(ERROR_CODE.INVALID_EMAIL_ADDRESS);
      }
      throw new BadRequestException(error);
    }
  }

  async sendNewPassword(
    email: string,
    payload: { username: string; newPassword: string },
  ) {
    const template = await this.templateRepository.findOne({
      templateCode: TEMPLATE.CODE.FORGOT_PASSWORD,
    });
    if (!template) {
      throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
    }
    try {
      await this.nodemailerService.send(email, {
        subject: template.subject,
        html: template.content
          .replace(TEMPLATE.KEYWORDS.FORGOT_PASSWORD.USERNAME, payload.username)
          .replace(
            TEMPLATE.KEYWORDS.FORGOT_PASSWORD.NEW_PASSWORD,
            payload.newPassword,
          ),
      });
    } catch (error) {
      if (error.message.includes('No recipients defined')) {
        throw new BadRequestException(ERROR_CODE.INVALID_EMAIL_ADDRESS);
      }
      throw new BadRequestException(error);
    }
  }
}
