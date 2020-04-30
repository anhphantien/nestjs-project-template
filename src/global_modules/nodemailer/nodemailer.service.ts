import * as nodemailer from 'nodemailer';
import config from '../../config';

export class NodeMailerService {
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

  async send(receiver: string, data: { subject: string, html: string, attachments?: any }) {
    return this.transporter.sendMail({
      to: receiver,
      subject: data.subject,
      html: data.html,
      attachments: data.attachments,
    });
  }
}
