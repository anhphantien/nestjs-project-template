import { Injectable, NotFoundException } from '@nestjs/common';
import { TemplateRepository } from '../../../repositories';
import { NodeMailerService } from '../../../global_modules/nodemailer/nodemailer.service';
import { TwilioService } from '../../../global_modules/twilio/twilio.service';
import { TEMPLATE, ERROR_CODE } from '../../../constants';
import config from '../../../config';

@Injectable()
export class NotificationService {
  constructor(
    private readonly templateRepository: TemplateRepository,
    private readonly nodeMailerService: NodeMailerService,
    private readonly twilioService: TwilioService,
  ) { }

  async otpNotification({ email, phone }, otp: string) {
    const template = await this.templateRepository.findOne({ templateCode: TEMPLATE.CODE.TWO_FACTOR_AUTHENTICATION });
    if (!template) {
      throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
    }
    if (email) {
      await this.nodeMailerService.send(email,
        {
          subject: template.subject,
          html: template.content
            .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP, otp)
            .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP_TIME_TO_LIVE, (Number(config.OTP_TIME_TO_LIVE) / 60).toString()),
        }
      );
    } else {
      await this.twilioService.send(phone,
        template.content
          .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP, otp)
          .replace(TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION.OTP_TIME_TO_LIVE, (Number(config.OTP_TIME_TO_LIVE) / 60).toString()),
      );
    }
  }

  async temporaryPasswordNotification({ email, phone }, temporaryPassword: string) {
    const template = await this.templateRepository.findOne({ templateCode: TEMPLATE.CODE.FORGOT_PASSWORD });
    if (!template) {
      throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
    }
    if (email) {
      await this.nodeMailerService.send(email,
        {
          subject: template.subject,
          html: template.content.replace(TEMPLATE.KEYWORDS.FORGOT_PASSWORD.TEMPORARY_PASSWORD, temporaryPassword),
        }
      );
    } else {
      await this.twilioService.send(phone, template.content.replace(TEMPLATE.KEYWORDS.FORGOT_PASSWORD.TEMPORARY_PASSWORD, temporaryPassword));
    }
  }
}
