import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import UsersService from '../services/users';

export const userSchema = Joi.object().keys({
  login: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,30}$/)
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

class UsersController {
  userService: UsersService;

  constructor() {
    this.userService = new UsersService();
    this.getOne = this.getOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const list = await this.userService.getAll(req.query);

      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.create(req.body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.update(req.body, req.params.id);

      if (!user) {
        res.status(404).send();
        return;
      }

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.getOne(req.params.id);

      if (!user) {
        res.status(404).send();
        return;
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.delete(req.params.id);

      if (!user) {
        res.status(404).send();
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
