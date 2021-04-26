import * as Sequelize from 'sequelize';
import { AnswerAttributes, AnswerInstance } from './Answer';
import { UserAttributes, UserInstance } from './User';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface UpvoteAttributes {
  id?: number;
  answer: AnswerAttributes | AnswerAttributes['id'] ;
  user: UserAttributes | UserAttributes['id'];
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UpvoteInstance extends Sequelize.Instance<UpvoteAttributes>, UpvoteAttributes {
  
};

export const UpvoteFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UpvoteInstance, UpvoteAttributes> => {
  const attributes: SequelizeAttributes<UpvoteAttributes> = {
    answer: {
      type: DataTypes.INTEGER
    },
    user: {
      type: DataTypes.INTEGER
    },
  };

  const Upvote = sequelize.define<UpvoteInstance, UpvoteAttributes>('Upvote', attributes);

  Upvote.associate = models => { // check this later
    Upvote.hasMany(models.Answer);
    Upvote.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
  };

  return Upvote;
};