import { Injectable } from '@nestjs/common';
import twilio = require('twilio');
require('dotenv').config();

@Injectable()
export class TwilioService {
  private client: twilio.Twilio;
  private phone: string;
  constructor() {
    this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    this.phone = process.env.TWILIO_PHONE;
  }

  send(recipient: string, body: string, mediaUrl?: string | string[]) {
    return this.client.messages.create({ from: this.phone, to: recipient, body, mediaUrl });
  }
}
