import * as Sequelize from 'sequelize';
import { AnswerAttributes, AnswerInstance } from './Answer';
import { UserAttributes, UserInstance } from '../models/User';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface QuestionAttributes {
  id?: number;
  name: string;
  title: string;
  text: string;
  category: 'tech' | 'croissants' | 'techno';
  createdAt?: Date;
  updatedAt?: Date;
};

export interface QuestionInstance extends Sequelize.Instance<QuestionAttributes>, QuestionAttributes {
};

export const QuestionFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<QuestionInstance, QuestionAttributes> => {
  const attributes: SequelizeAttributes<QuestionAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING(5000) // extra long length
    },
    category: {
      type: DataTypes.ENUM('tech', 'croissants', 'techno')
    }
  };

  const Question = sequelize.define<QuestionInstance, QuestionAttributes>('Question', attributes);

  return Question;
};