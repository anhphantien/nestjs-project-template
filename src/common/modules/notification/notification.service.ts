import { Injectable, NotFoundException } from '@nestjs/common';
import { TemplateRepository } from '../../../repositories';
import { NodemailerService } from '../../../global_modules/nodemailer/nodemailer.service';
import { TwilioService } from '../../../global_modules/twilio/twilio.service';
import { TEMPLATE, ERROR_CODE } from '../../../constants';

@Injectable()
export class NotificationService {
  constructor(
    private readonly templateRepository: TemplateRepository,
    private readonly nodemailerService: NodemailerService,
    private readonly twilioService: TwilioService,
  ) { }

  async otpNotification({ email, phone }, otp: string) {
    const template = await this.templateRepository.findOne({ templateCode: TEMPLATE.CODE.TWO_FACTOR_AUTHENTICATION });
    if (!template) {
      throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
    }
    if (email) {
      await this.nodemailerService.send(email,
        {
          subject: template.subject,
          html: template.content
            .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP, otp)
            .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP_TTL, (Number(process.env.OTP_TTL) / 60).toString()),
        }
      );
    } else {
      await this.twilioService.send(phone,
        template.content
          .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP, otp)
          .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP_TTL, (Number(process.env.OTP_TTL) / 60).toString()),
      );
    }
  }

  async newPasswordNotification({ email, phone }, newPassword: string) {
    const template = await this.templateRepository.findOne({ templateCode: TEMPLATE.CODE.FORGOT_PASSWORD });
    if (!template) {
      throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
    }
    if (email) {
      await this.nodemailerService.send(email,
        {
          subject: template.subject,
          html: template.content.replace(TEMPLATE.KEYWORDS.FORGOT_PASSWORD.NEW_PASSWORD, newPassword),
        }
      );
    } else {
      await this.twilioService.send(phone, template.content.replace(TEMPLATE.KEYWORDS.FORGOT_PASSWORD.NEW_PASSWORD, newPassword));
    }
  }
}
