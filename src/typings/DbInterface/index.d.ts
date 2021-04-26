import * as Sequelize from "sequelize";
import { AnswerAttributes, AnswerInstance } from "../../models/Answer";
import { QuestionAttributes, QuestionInstance } from "../../models/Question";
import { UserAttributes, UserInstance } from "../../models/User";
import { SubscriptionAttributes, SubscriptionInstance } from "../../models/Subscription";
import { NotificationAttributes, NotificationInstance } from "../../models/Notification";
import { UpvoteAttributes, UpvoteInstance } from "../../models/Upvotes";
import { DownvoteAttributes, DownvoteInstance } from "../../models/Downvotes";

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Answer: Sequelize.Model<AnswerInstance, AnswerAttributes>;
  Question: Sequelize.Model<QuestionInstance, QuestionAttributes>;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Subscription: Sequelize.Model<SubscriptionInstance, SubscriptionAttributes>;
  Notification: Sequelize.Model<NotificationInstance, NotificationAttributes>;
  Upvote: Sequelize.Model<UpvoteInstance, UpvoteAttributes>;
  Downvote: Sequelize.Model<DownvoteInstance, DownvoteAttributes>;
}