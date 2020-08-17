import nodemailer = require('nodemailer');
import config from '../../config';
import { Attachment } from 'nodemailer/lib/mailer';

export class NodemailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.NODE_MAILER_HOST,
      port: Number(config.NODE_MAILER_PORT),
      secure: JSON.parse(config.NODE_MAILER_SECURE),
      auth: {
        user: config.NODE_MAILER_USER,
        pass: config.NODE_MAILER_PASS,
      },
    });
  }

  async send(recipient: string, data: { subject: string, html: string, attachments?: Attachment[] }) {
    return this.transporter.sendMail({
      to: recipient,
      subject: data.subject,
      html: data.html,
      attachments: data.attachments,
    });
  }
}
