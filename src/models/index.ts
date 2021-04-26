import { Sequelize } from 'sequelize';
import { DbInterface } from'../typings/DbInterface';
import { UserFactory } from './User';
import { QuestionFactory } from './Question';
import { AnswerFactory } from './Answer';
import { SubscriptionFactory } from './Subscription';
import { NotificationFactory } from './Notification';
import { UpvoteFactory } from './Upvotes';
import { DownvoteFactory } from './Downvotes'

const sequelizeConfig = require('../config/config.json');

export const createModels = (): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Answer: AnswerFactory(sequelize, Sequelize),
    Question: QuestionFactory(sequelize, Sequelize),
    User: UserFactory(sequelize, Sequelize),
    Subscription: SubscriptionFactory(sequelize, Sequelize),
    Notification: NotificationFactory(sequelize, Sequelize),
    Upvote: UpvoteFactory(sequelize, Sequelize),
    Downvote: DownvoteFactory(sequelize, Sequelize),
  };

  Object.keys(db).forEach((modelName: string) => (db: Record<string, any>) => { // probably has made us loose the strong typings
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
