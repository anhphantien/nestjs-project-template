import { Injectable } from '@nestjs/common';
import twilio = require('twilio');
import config from '../../config';

@Injectable()
export class TwilioService {
  private client: twilio.Twilio;
  private phone: string;
  constructor() {
    this.client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
    this.phone = config.TWILIO_PHONE;
  }

  async send(phone: string, body: string) {
    return this.client.messages.create({
      body,
      from: this.phone,
      to: phone,
    });
  }
}
