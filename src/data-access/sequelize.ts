import { Sequelize } from 'sequelize';
import config from './config.json';

const { database, login, password, host, port } = config.pg;

export const sequelize = new Sequelize(
  `postgres://${login}:${password}@${host}:${port}/${database}`,
);
