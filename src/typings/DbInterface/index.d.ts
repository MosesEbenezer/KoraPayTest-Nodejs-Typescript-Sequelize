import * as Sequelize from "sequelize";
import { AnswerAttributes, AnswerInstance } from "../../models/Answer";
import { QuestionAttributes, QuestionInstance } from "../../models/Question";
import { UserAttributes, UserInstance } from "../../models/User";

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Answer: Sequelize.Model<AnswerInstance, AnswerAttributes>;
  Question: Sequelize.Model<QuestionInstance, QuestionAttributes>;
  User: Sequelize.Model<UserInstance, UserAttributes>;
}