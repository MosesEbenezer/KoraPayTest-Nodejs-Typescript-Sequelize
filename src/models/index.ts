import { Sequelize } from 'sequelize';
import { DbInterface } from'../typings/DbInterface';
import { UserFactory } from './User';
import { QuestionFactory } from './Question';
import { AnswerFactory } from './Answer';

export const createModels = (sequelizeConfig: any): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Answer: AnswerFactory(sequelize, Sequelize),
    Question: QuestionFactory(sequelize, Sequelize),
    User: UserFactory(sequelize, Sequelize)
  };

  return db;
};
