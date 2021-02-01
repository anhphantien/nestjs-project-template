import { TEMPLATE } from '@/constants';
import { Template } from '@/entities';
import { define } from 'typeorm-seeding';

define(Template, () => {
  const template = new Template();
  template.templateCode = TEMPLATE.CODE.FORGOT_PASSWORD;
  template.subject = 'OTP Alert';
  template.content = `Hi, {{USERNAME}}! Your OTP is: <strong>{{OTP}}</strong>. The OTP is valid for {{OTP_TTL}} minute(s).`;
  return template;
});
