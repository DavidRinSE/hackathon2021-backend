import Sequelize from "sequelize"
const {Model} = Sequelize
export default (sequelize, DataTypes) => {
  class dummy_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  dummy_table.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dummy_table',
  });
  return dummy_table;
};