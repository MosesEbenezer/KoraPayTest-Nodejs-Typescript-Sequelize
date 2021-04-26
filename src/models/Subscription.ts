import * as Sequelize from 'sequelize';
import { QuestionAttributes, QuestionInstance } from './Question';
import { UserAttributes, UserInstance } from './User';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface SubscriptionAttributes {
  id?: number;
  question: QuestionAttributes | QuestionAttributes['id'] ;
  user: UserAttributes | UserAttributes['id'];
  createdAt?: Date;
  updatedAt?: Date;

};

export interface SubscriptionInstance extends Sequelize.Instance<SubscriptionAttributes>, SubscriptionAttributes {
  
};

export const SubscriptionFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<SubscriptionInstance, SubscriptionAttributes> => {
  const attributes: SequelizeAttributes<SubscriptionAttributes> = {
    question: {
      type: DataTypes.INTEGER
    },
    user: {
      type: DataTypes.INTEGER
    },
  };

  const Subscription = sequelize.define<SubscriptionInstance, SubscriptionAttributes>('Subscription', attributes);

  Subscription.associate = models => { // check this later
    Subscription.hasMany(models.Answer);
    Subscription.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
  };

  return Subscription;
};