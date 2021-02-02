import { USER } from '@/constants';
import { User } from '@/entities';
import bcrypt = require('bcrypt');
import { getRepository } from 'typeorm';
import { Seeder } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  async run() {
    await getRepository(User).save({
      username: 'superadmin',
      passwordHash: bcrypt.hashSync('123456', 10),
      role: USER.ROLE.ADMIN,
      status: USER.STATUS.ACTIVE,
    });
  }
}
