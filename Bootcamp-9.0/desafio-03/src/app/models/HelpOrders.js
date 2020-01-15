import Sequelize, { Model } from "sequelize";

class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        question: Sequelize.TEXT,
        answer: Sequelize.TEXT,
        answer_at: Sequelize.DATE
      },
      {
        sequelize
      }
    );

    return this;
  }
}
export default HelpOrders;
