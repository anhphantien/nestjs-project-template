import { USER } from '@/constants';
import { User } from '@/entities';
import { getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  async run(factory: Factory) {
    const user = await getRepository(User).findOne({ role: USER.ROLE.ADMIN });
    if (!user) {
      await factory(User)().create();
    }
  }
}
