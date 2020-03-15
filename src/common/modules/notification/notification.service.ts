import { Injectable, NotFoundException } from '@nestjs/common';
import { TemplateRepository } from '../../../repositories';
import { NodeMailerService } from '../../../global_modules/nodemailer/nodemailer.service';
import { TwilioService } from '../../../global_modules/twilio/twilio.service';
import { TEMPLATE, ERROR_CODE } from '../../../constants';

@Injectable()
export class NotificationService {
  constructor(
    private readonly templateRepository: TemplateRepository,
    private readonly nodemailerService: NodeMailerService,
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
          html: template.content.replace(TEMPLATE.KEYWORD.TWO_FACTOR_AUTHENTICATION.OTP, otp),
        }
      );
    } else {
      await this.twilioService.send(phone, template.content.replace(TEMPLATE.KEYWORD.TWO_FACTOR_AUTHENTICATION.OTP, otp));
    }
  }

  async temporaryPasswordNotification({ email, phone }, temporaryPassword: string) {
    const template = await this.templateRepository.findOne({ templateCode: TEMPLATE.CODE.FORGOT_PASSWORD });
    if (!template) {
      throw new NotFoundException(ERROR_CODE.TEMPLATE_NOT_FOUND);
    }
    if (email) {
      await this.nodemailerService.send(email,
        {
          subject: template.subject,
          html: template.content.replace(TEMPLATE.KEYWORD.FORGOT_PASSWORD.TEMPORARY_PASSWORD, temporaryPassword),
        }
      );
    } else {
      await this.twilioService.send(phone, template.content.replace(TEMPLATE.KEYWORD.FORGOT_PASSWORD.TEMPORARY_PASSWORD, temporaryPassword));
    }
  }
}
