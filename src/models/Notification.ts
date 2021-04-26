import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from './User';
import { QuestionAttributes, QuestionInstance } from './Question';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface NotificationAttributes {
  id?: number;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  
  user: UserAttributes | UserAttributes['id'];
  question: QuestionAttributes | QuestionAttributes['id'];
};

export interface NotificationInstance extends Sequelize.Instance<NotificationAttributes>, NotificationAttributes {
  // 
};

export const NotificationFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<NotificationInstance, NotificationAttributes> => {
  const attributes: SequelizeAttributes<NotificationAttributes> = {
    message: {
      type: DataTypes.STRING
    },
    user: {
      type: DataTypes.INTEGER
    },
    question: {
      type: DataTypes.INTEGER
    }
  };

  const Notification = sequelize.define<NotificationInstance, NotificationAttributes>('Notification', attributes);

  Notification.associate = models => { // check later
    Notification.hasMany(models.Answer);
    Notification.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
  };

  return Notification;
};