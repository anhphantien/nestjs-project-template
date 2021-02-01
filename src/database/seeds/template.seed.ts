import { TEMPLATE } from '@/constants';
import { Template } from '@/entities';
import { getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateTemplate implements Seeder {
  async run(factory: Factory) {
    const template = await getRepository(Template).findOne({ templateCode: TEMPLATE.CODE.FORGOT_PASSWORD });
    if (!template) {
      await factory(Template)().create();
    }
  }
}
