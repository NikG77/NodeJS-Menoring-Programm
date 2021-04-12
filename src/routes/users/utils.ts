import * as faker from 'faker';

import { User } from './user.types';

export function initMockUsers(amount: number): User[] {
  return new Array(amount).fill(null).map(() => ({
    id: faker.random.uuid(),
    login: faker.internet.userName(),
    password: faker.random.alphaNumeric(8),
    age: faker.random.number({ min: 4, max: 130 }),
    isDeleted: false,
  }));
}
