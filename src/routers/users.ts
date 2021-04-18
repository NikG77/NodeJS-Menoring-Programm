import { Router } from 'express';
import Users, { userSchema } from '../controllers/users';
import validateSchema from '../middlewares/validation';

const router = Router();
const users = new Users();

router.get('/users', users.getAll);

router.get('/users/:id', users.getOne);

router.post('/users', validateSchema(userSchema), users.create);

router.patch('/users/:id', validateSchema(userSchema), users.update);

router.delete('/users/:id', users.delete);

export default router;
