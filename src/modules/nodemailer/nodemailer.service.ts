import {
  NODEMAILER_HOST,
  NODEMAILER_PASS,
  NODEMAILER_PORT,
  NODEMAILER_SECURE,
  NODEMAILER_USER,
} from '@/constants';
import { Injectable } from '@nestjs/common';
import nodemailer = require('nodemailer');
import { Attachment } from 'nodemailer/lib/mailer';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: NODEMAILER_HOST,
      port: NODEMAILER_PORT,
      secure: NODEMAILER_SECURE === 'true',
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
      },
    });
  }

  send(
    recipient: string,
    content: { subject: string; html: string; attachments?: Attachment[] },
  ) {
    return this.transporter.sendMail({
      to: recipient,
      subject: content.subject,
      html: content.html,
      attachments: content.attachments,
    });
  }
}
