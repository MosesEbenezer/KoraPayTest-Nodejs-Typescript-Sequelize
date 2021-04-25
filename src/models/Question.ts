import * as Sequelize from 'sequelize';
import { AnswerAttributes, AnswerInstance } from './Answer';
import { UserAttributes, UserInstance } from '../models/User';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface QuestionAttributes {
  id?: number;
  title: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;

  answers?: AnswerAttributes[] | AnswerAttributes['id'][];
  author: UserAttributes | UserAttributes['id'];
};

export interface QuestionInstance extends Sequelize.Instance<QuestionAttributes>, QuestionAttributes {
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

  getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;
};

export const QuestionFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<QuestionInstance, QuestionAttributes> => {
  const attributes: SequelizeAttributes<QuestionAttributes> = {
    title: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING(3000)
    },
    author: {
      type: DataTypes.INTEGER
    }
  };

  const Question = sequelize.define<QuestionInstance, QuestionAttributes>('Question', attributes);

  Question.associate = models => {
    Question.hasMany(models.Answer);
    Question.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
  };

  return Question;
};