import * as Sequelize from 'sequelize';
import { AnswerAttributes, AnswerInstance } from './Answer';
import { UserAttributes, UserInstance } from './User';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface DownvoteAttributes {
  id?: number;
  answer: AnswerAttributes | AnswerAttributes['id'] ;
  user: UserAttributes | UserAttributes['id'];
  createdAt?: Date;
  updatedAt?: Date;
};

export interface DownvoteInstance extends Sequelize.Instance<DownvoteAttributes>, DownvoteAttributes {
  
};

export const DownvoteFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<DownvoteInstance, DownvoteAttributes> => {
  const attributes: SequelizeAttributes<DownvoteAttributes> = {
    answer: {
      type: DataTypes.INTEGER
    },
    user: {
      type: DataTypes.INTEGER
    },
  };

  const Downvote = sequelize.define<DownvoteInstance, DownvoteAttributes>('Downvote', attributes);

  // Downvote.associate = models => { // check this later
  //   Downvote.hasMany(models.Answer);
  //   Downvote.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
  // };

  return Downvote;
};