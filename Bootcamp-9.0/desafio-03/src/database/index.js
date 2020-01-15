import Sequelize from "sequelize";
import Users from "../app/models/Users";
import Students from "../app/models/Students";
import Planos from "../app/models/Planos";
import Matriculation from "../app/models/Matriculation";
import Checkins from "../app/models/Checkins";
import databaseConfig from "../config/database";
import HelpOrders from "../app/models/HelpOrders";

const models = [Users, Students, Planos, Matriculation, Checkins, HelpOrders];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}
export default new Database();
