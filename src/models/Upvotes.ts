import * as Sequelize from 'sequelize';
import { QuestionAttributes, QuestionInstance } from './Question';
import { UserAttributes, UserInstance } from './User';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface UpvoteAttributes {
  id?: number;
  questionId: number ;
  userId: UserAttributes | UserAttributes['id'];
  createdAt?: Date;
  updatedAt?: Date;

  // answers?: AnswerAttributes[] | AnswerAttributes['id'][];
  // author: UserAttributes | UserAttributes['id'];
};

export interface UpvoteInstance extends Sequelize.Instance<UpvoteAttributes>, UpvoteAttributes {
  
};

export const UpvoteFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UpvoteInstance, UpvoteAttributes> => {
  const attributes: SequelizeAttributes<UpvoteAttributes> = {
    questionId: {
      type: DataTypes.INTEGER
    },
    userId: {
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