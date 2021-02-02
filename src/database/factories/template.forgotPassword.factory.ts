import { TEMPLATE } from '@/constants';
import { Template } from '@/entities';
import { define } from 'typeorm-seeding';

require('dotenv').config();

const { USERNAME, NEW_PASSWORD } = TEMPLATE.KEYWORDS.FORGOT_PASSWORD;

define(Template, () => {
  const template = new Template();
  template.templateCode = TEMPLATE.CODE.FORGOT_PASSWORD;
  template.subject = process.env.APP_NAME;
  template.content = `Hi, ${USERNAME}! Your new password is: <strong>${NEW_PASSWORD}</strong>. Please change your password again after next login.`;
  return template;
});
