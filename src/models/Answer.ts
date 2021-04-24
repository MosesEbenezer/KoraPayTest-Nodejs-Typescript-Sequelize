import * as Sequelize from 'sequelize';
import { QuestionAttributes, QuestionInstance } from './Question';
import { UserAttributes, UserInstance } from './User';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface AnswerAttributes {
  id?: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface AnswerInstance extends Sequelize.Instance<AnswerAttributes>, AnswerAttributes {
};

export const AnswerFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<AnswerInstance, AnswerAttributes> => {
  const attributes: SequelizeAttributes<AnswerAttributes> = {
    text: {
      type: DataTypes.STRING(1000)
    }
  };

  const Answer = sequelize.define<AnswerInstance, AnswerAttributes>('Answer', attributes);

  return Answer;
};