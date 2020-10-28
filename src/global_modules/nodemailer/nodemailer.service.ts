import { Injectable } from '@nestjs/common';
import nodemailer = require('nodemailer');
require('dotenv').config();
import { Attachment } from 'nodemailer/lib/mailer';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: Number(process.env.NODEMAILER_PORT),
      secure: JSON.parse(process.env.NODEMAILER_SECURE),
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  send(recipient: string, content: { subject: string, html: string, attachments?: Attachment[] }) {
    return this.transporter.sendMail({
      to: recipient,
      subject: content.subject,
      html: content.html,
      attachments: content.attachments,
    });
  }
}
