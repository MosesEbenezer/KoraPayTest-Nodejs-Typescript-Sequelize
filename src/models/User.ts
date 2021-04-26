import * as Sequelize from 'sequelize';
import { AnswerAttributes, AnswerInstance } from './Answer';
import { QuestionAttributes, QuestionInstance } from './Question';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  answers?: AnswerAttributes[] | AnswerAttributes['id'][];
  questions?: QuestionAttributes[] | QuestionAttributes['id'][];
  upvotedAnswers?: AnswerAttributes[] | AnswerAttributes['id'][];
};

// second type each model needs is a ModelInstance. This represents a Sequelize instance for an actual database row.
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  getAnswers: Sequelize.HasManyGetAssociationsMixin<AnswerInstance>;
  setAnswers: Sequelize.HasManySetAssociationsMixin<AnswerInstance, AnswerInstance['id']>;
  addAnswers: Sequelize.HasManyAddAssociationsMixin<AnswerInstance, AnswerInstance['id']>;
  addAnswer: Sequelize.HasManyAddAssociationMixin<AnswerInstance, AnswerInstance['id']>;
  createAnswer: Sequelize.HasManyCreateAssociationMixin<AnswerAttributes, AnswerInstance>;
  removeAnswer: Sequelize.HasManyRemoveAssociationMixin<AnswerInstance, AnswerInstance['id']>;
  removeAnswers: Sequelize.HasManyRemoveAssociationsMixin<AnswerInstance, AnswerInstance['id']>;
  hasAnswer: Sequelize.HasManyHasAssociationMixin<AnswerInstance, AnswerInstance['id']>;
  hasAnswers: Sequelize.HasManyHasAssociationsMixin<AnswerInstance, AnswerInstance['id']>;
  countAnswers: Sequelize.HasManyCountAssociationsMixin;

  getQuestions: Sequelize.HasManyGetAssociationsMixin<QuestionInstance>;
  setQuestions: Sequelize.HasManySetAssociationsMixin<QuestionInstance, QuestionInstance['id']>;
  addQuestions: Sequelize.HasManyAddAssociationsMixin<QuestionInstance, QuestionInstance['id']>;
  addQuestion: Sequelize.HasManyAddAssociationMixin<QuestionInstance, QuestionInstance['id']>;
  createQuestion: Sequelize.HasManyCreateAssociationMixin<QuestionAttributes, QuestionInstance>;
  removeQuestion: Sequelize.HasManyRemoveAssociationMixin<QuestionInstance, QuestionInstance['id']>;
  removeQuestions: Sequelize.HasManyRemoveAssociationsMixin<QuestionInstance, QuestionInstance['id']>;
  hasQuestion: Sequelize.HasManyHasAssociationMixin<QuestionInstance, QuestionInstance['id']>;
  hasQuestions: Sequelize.HasManyHasAssociationsMixin<QuestionInstance, QuestionInstance['id']>;
  countQuestions: Sequelize.HasManyCountAssociationsMixin;

  getUpvotedAnswers: Sequelize.BelongsToManyGetAssociationsMixin<AnswerInstance>;
  setUpvotedAnswers: Sequelize.BelongsToManySetAssociationsMixin<AnswerInstance, AnswerInstance['id'], 'QuestionUpvotes'>;
  addUpvotedAnswers: Sequelize.BelongsToManyAddAssociationsMixin<AnswerInstance, AnswerInstance['id'], 'QuestionUpvotes'>;
  addUpvotedAnswer: Sequelize.BelongsToManyAddAssociationMixin<AnswerInstance, AnswerInstance['id'], 'QuestionUpvotes'>;
  createUpvotedAnswer: Sequelize.BelongsToManyCreateAssociationMixin<AnswerAttributes, AnswerInstance['id'], 'QuestionUpvotes'>;
  removeUpvotedAnswer: Sequelize.BelongsToManyRemoveAssociationMixin<AnswerInstance, AnswerInstance['id']>;
  removeUpvotedAnswers: Sequelize.BelongsToManyRemoveAssociationsMixin<AnswerInstance, AnswerInstance['id']>;
  hasUpvotedAnswer: Sequelize.BelongsToManyHasAssociationMixin<AnswerInstance, AnswerInstance['id']>;
  hasUpvotedAnswers: Sequelize.BelongsToManyHasAssociationsMixin<AnswerInstance, AnswerInstance['id']>;
  countUpvotedAnswers: Sequelize.BelongsToManyCountAssociationsMixin;
};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  User.associate = models => {
    User.hasMany(models.Answer, { foreignKey: 'AuthorId' });
    User.hasMany(models.Question, { foreignKey: 'AuthorId' });
    User.belongsToMany(models.Answer, {
      through: 'QuestionUpvotes',
      as: 'upvotedAnswers'
    });
  };

  return User;
};