import { USER } from '@/constants';
import { User } from '@/entities';
import bcrypt = require('bcrypt');
import { define } from 'typeorm-seeding';

define(User, () => {
  const user = new User();
  user.username = 'superadmin';
  user.passwordHash = bcrypt.hashSync('123456', 10);
  user.role = USER.ROLE.ADMIN;
  user.status = USER.STATUS.ACTIVE;
  return user;
});
