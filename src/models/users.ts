import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../data-access/sequelize';
import { User as UserType } from '../types/user';

class User extends Model<UserType> implements UserType {
  public id!: string;
  public login: string;
  public age: number;
  public password: string;
  public isDeleted!: boolean;

  toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    tableName: 'users',
    sequelize,
  },
);

export { User };
