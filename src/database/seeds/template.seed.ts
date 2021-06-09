import { TEMPLATE } from '@/constants';
import { Template } from '@/entities';
import { getRepository } from 'typeorm';
import { Seeder } from 'typeorm-seeding';

const { TWO_FACTOR_AUTHENTICATION, FORGOT_PASSWORD } = TEMPLATE.KEYWORDS;

const defaultTemplates: Partial<Template>[] = [
  {
    templateCode: TEMPLATE.CODE.TWO_FACTOR_AUTHENTICATION,
    subject: process.env.APP_NAME,
    content: `Hi, ${TWO_FACTOR_AUTHENTICATION.USERNAME}! Your OTP is: <strong>${TWO_FACTOR_AUTHENTICATION.OTP}</strong>. The OTP is valid for ${TWO_FACTOR_AUTHENTICATION.OTP_TTL} minute(s).`,
  },
  {
    templateCode: TEMPLATE.CODE.FORGOT_PASSWORD,
    subject: process.env.APP_NAME,
    content: `Hi, ${FORGOT_PASSWORD.USERNAME}! Your new password is: <strong>${FORGOT_PASSWORD.NEW_PASSWORD}</strong>. Please change your password again after next login.`,
  },
];

export default class CreateTemplates implements Seeder {
  async run() {
    const templates = await getRepository(Template).find({
      where: defaultTemplates.map(({ templateCode }) => ({ templateCode })),
    });
    await getRepository(Template).save(
      defaultTemplates.map((defaultTemplate) => ({
        ...templates.find(
          (template) => template.templateCode === defaultTemplate.templateCode,
        ),
        ...defaultTemplate,
      })),
    );
  }
}
