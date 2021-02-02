import { TEMPLATE } from '@/constants';
import { Template } from '@/entities';
import { define } from 'typeorm-seeding';

require('dotenv').config();

const { USERNAME, OTP, OTP_TTL } = TEMPLATE.KEYWORDS.TWO_FACTOR_AUTHENTICATION;

define(Template, () => {

  const template = new Template();
  template.templateCode = TEMPLATE.CODE.TWO_FACTOR_AUTHENTICATION;
  template.subject = process.env.APP_NAME;
  template.content = `Hi, ${USERNAME}! Your OTP is: <strong>${OTP}</strong>. The OTP is valid for ${OTP_TTL} minute(s).`;
  return template;
});
