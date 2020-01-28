import Sequelize from "sequelize";
import Users from "../app/models/Users";
import Students from '../app/models/Students';
import databaseConfig from "../config/database";

const models = [Users, Students];

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
