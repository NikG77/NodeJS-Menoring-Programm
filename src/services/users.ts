import { Op } from 'sequelize';
import { User as UserModel } from '../models/users';
import { User as UserType } from '../types/user';

class UsersService {
  async getAll({ limit = '10', substring = '' }): Promise<Array<UserType>> {
    return await UserModel.findAll({
      order: [['login', 'ASC']],
      limit: Number(limit),
      ...(substring
        ? {
            where: {
              login: {
                [Op.substring]: substring,
              },
              isDeleted: false,
            },
          }
        : {}),
    });
  }

  async create(user: UserType): Promise<UserType> {
    return await UserModel.create(user);
  }

  async getOne(id: string): Promise<UserType> {
    return await UserModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(user: UserType, id: string): Promise<UserType> {
    const result = await UserModel.update(
      {
        ...user,
      },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    return result[1][0];
  }

  async delete(id: string): Promise<UserType> {
    const result = await UserModel.update(
      { isDeleted: true },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    return result[1][0];
  }
}

export default UsersService;
