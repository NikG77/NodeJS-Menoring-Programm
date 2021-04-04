import { Router, Request, Response } from 'express';
import * as faker from 'faker';
import { User } from './user.types';
import { initMockUsers } from './utils';
import Ajv from 'ajv';
import { patchUserSchema } from './schemas';

const router = Router();
const usersData = initMockUsers(5);

const ajv = new Ajv();
const patchUserValidate = ajv.compile(patchUserSchema);

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = usersData.find((user: User) => user.id === id);

  if (user) {
    res.status(200);
    res.json(user);
  } else {
    res.status(404);
    res.json({ path: req.path, message: 'User not found.' });
  }
});

router.post('/create', async (req: Request, res: Response) => {
  const body = req.body;

  if (patchUserValidate(req.body)) {
    const userExists = await Promise.resolve(
      usersData.find((user) => user.login === req.body.login),
    ).then((user) => !!user);

    if (userExists) {
      res.status(400);
      res.json({
        path: req.path,
        message: 'User with this login already exists.',
      });
      return;
    }

    const user: User = {
      id: faker.random.uuid(),
      isDeleted: false,
      ...body,
    };
    usersData.push(user);
    res.status(200);
    res.json(user);
  } else {
    res.status(400);
    res.json(patchUserValidate.errors);
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = usersData.find((user: User) => user.id === id);

  if (user) {
    user.isDeleted = true;
    res.status(200);
    res.json(user);
  } else {
    res.status(404);
    res.json({ path: req.path, message: 'User not found.' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = usersData.find((user: User) => user.id === id);
  const { login, password, age } = req.body;

  if (user) {
    if (patchUserValidate(req.body)) {
      const userExists = await Promise.resolve(
        usersData.find((user) => user.login === req.body.login && user.id !== id),
      ).then((user) => !!user);

      if (userExists) {
        res.status(400);
        res.json({
          path: req.path,
          message: 'User with this login already exists.',
        });
        return;
      }

      user.login = login || user.login;
      user.password = password || user.password;
      user.age = age || user.age;
      res.status(200);
      res.json(user);
    } else {
      res.status(400);
      res.json(patchUserValidate.errors);
    }
  } else {
    res.status(404);
    res.json({ path: req.path, message: 'User not found.' });
  }
});

router.get('/', (req: Request, res: Response) => {
  const { loginSubstring = '', limit = 10 } = req.query;
  const result = getAutoSuggestUsers(loginSubstring as string, limit as number);
  res.status(200);
  res.json(result);
});

function getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
  let result = [...usersData];

  if (loginSubstring) {
    result = result.filter((user) => user.login.includes(loginSubstring));
  }
  result = result.sort((a, b) => (a.login < b.login ? -1 : 1)).slice(0, +limit);

  return result;
}

export { router as usersRoutes };
