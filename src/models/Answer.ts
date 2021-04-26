import * as Sequelize from 'sequelize';
import { QuestionAttributes, QuestionInstance } from './Question';
import { UserAttributes, UserInstance } from './User';
import { UpvoteAttributes, UpvoteInstance } from './Upvotes';
import { DownvoteAttributes, DownvoteInstance } from './Downvotes';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface AnswerAttributes {
  id?: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: UserAttributes | UserAttributes['id'];
  question?: QuestionAttributes | QuestionAttributes['id'];

  // upvotes?: UpvoteAttributes[] | UpvoteAttributes['id'];
  // downvotes?: DownvoteAttributes[] | DownvoteInstance['id'];
  // downvoters?: UserAttributes[] | UserAttributes['id'];
  // upvoters?: UserAttributes[] | UserAttributes['id'][];
};

export interface AnswerInstance extends Sequelize.Instance<AnswerAttributes>, AnswerAttributes {

  getQuestion: Sequelize.BelongsToGetAssociationMixin<QuestionInstance>;
  setQuestion: Sequelize.BelongsToSetAssociationMixin<QuestionInstance, QuestionInstance['id']>;
  createQuestion: Sequelize.BelongsToCreateAssociationMixin<QuestionAttributes, QuestionInstance>;

  getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;

  getUpvoters: Sequelize.BelongsToManyGetAssociationsMixin<UserInstance>;
  setUpvoters: Sequelize.BelongsToManySetAssociationsMixin<UserInstance, UserInstance['id'], 'Upvotes'>;
  addUpvoters: Sequelize.BelongsToManyAddAssociationsMixin<UserInstance, UserInstance['id'], 'Upvotes'>;
  addUpvoter: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], 'Upvotes'>;
  createUpvoters: Sequelize.BelongsToManyCreateAssociationMixin<UserAttributes, UserInstance['id'], 'Upvotes'>;
  removeUpvoter: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserInstance['id']>;
  removeUpvoters: Sequelize.BelongsToManyRemoveAssociationsMixin<UserInstance, UserInstance['id']>;
  hasUpvoter: Sequelize.BelongsToManyHasAssociationMixin<UserInstance, UserInstance['id']>;
  hasUpvoters: Sequelize.BelongsToManyHasAssociationsMixin<UserInstance, UserInstance['id']>;
  countUpvoters: Sequelize.BelongsToManyCountAssociationsMixin;
};

export const AnswerFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<AnswerInstance, AnswerAttributes> => {
  const attributes: SequelizeAttributes<AnswerAttributes> = {
    text: {
      type: DataTypes.STRING(1000)
    },
    question: {
      type: DataTypes.INTEGER
    },
    author: {
      type: DataTypes.INTEGER
    },
  };

  const Answer = sequelize.define<AnswerInstance, AnswerAttributes>('Answer', attributes);

  Answer.associate = models => { // check later
    Answer.belongsTo(models.Question);
    Answer.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
    Answer.belongsToMany(models.User, {
      through: 'AnswerUpvotes',
      as: 'upvoters'
    });
  };

  return Answer;
};