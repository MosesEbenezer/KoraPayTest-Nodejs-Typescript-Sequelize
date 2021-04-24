import * as Sequelize from 'sequelize';
import { AnswerAttributes, AnswerInstance } from './Answer';
import { QuestionAttributes, QuestionInstance } from './Question';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string; // remember the hashing
  createdAt?: Date;
  updatedAt?: Date;
  // with ? are optional, when creating a new instance of a model, we don’t want to be
  // forced to specify these fields. All set automatically by sequelize
};

// second type each model needs is a ModelInstance. This represents a Sequelize instance for an actual database row.
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  
};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  return User;
};