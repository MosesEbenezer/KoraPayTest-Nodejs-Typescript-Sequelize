import * as Sequelize from 'sequelize';
import { QuestionAttributes, QuestionInstance } from './Question';
import { UserAttributes, UserInstance } from './User';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface AnswerAttributes {
  id?: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;


  question?: QuestionAttributes | QuestionAttributes['id'];

  author?: UserAttributes | UserAttributes['id'];

  // `upvoters` is a BelongsToMany association, so we define that
  // an answer can have an array of User's, under the field `upvoters`.
  upvoters?: UserAttributes[] | UserAttributes['id'][];
};

export interface AnswerInstance extends Sequelize.Instance<AnswerAttributes>, AnswerAttributes {

  getQuestion: Sequelize.BelongsToGetAssociationMixin<QuestionInstance>;
  setQuestion: Sequelize.BelongsToSetAssociationMixin<QuestionInstance, QuestionInstance['id']>;
  createQuestion: Sequelize.BelongsToCreateAssociationMixin<QuestionAttributes, QuestionInstance>;

  getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;

  getUpvoters: Sequelize.BelongsToManyGetAssociationsMixin<UserInstance>;
  setUpvoters: Sequelize.BelongsToManySetAssociationsMixin<UserInstance, UserInstance['id'], 'QuestionUpvotes'>;
  addUpvoters: Sequelize.BelongsToManyAddAssociationsMixin<UserInstance, UserInstance['id'], 'QuestionUpvotes'>;
  addUpvoter: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], 'QuestionUpvotes'>;
  createUpvoters: Sequelize.BelongsToManyCreateAssociationMixin<UserAttributes, UserInstance['id'], 'QuestionUpvotes'>;
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
    }
  };

  const Answer = sequelize.define<AnswerInstance, AnswerAttributes>('Answer', attributes);

  Answer.associate = models => {
    Answer.belongsTo(models.Question);
    Answer.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
    Answer.belongsToMany(models.User, {
      through: 'QuestionUpvotes',
      as: 'upvoters'
    });
  };

  return Answer;
};