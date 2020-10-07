import nodemailer = require('nodemailer');
require('dotenv').config();
import { Attachment } from 'nodemailer/lib/mailer';

export class NodemailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NODE_MAILER_HOST,
      port: Number(process.env.NODE_MAILER_PORT),
      secure: JSON.parse(process.env.NODE_MAILER_SECURE),
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });
  }

  send(recipient: string, data: { subject: string, html: string, attachments?: Attachment[] }) {
    return this.transporter.sendMail({
      to: recipient,
      subject: data.subject,
      html: data.html,
      attachments: data.attachments,
    });
  }
}
