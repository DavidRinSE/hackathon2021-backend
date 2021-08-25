import Sequelize from "sequelize"
const {Model} = Sequelize
export default (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Location.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    providerId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Providers',
        key: 'id'
      }
    },
    streetAddress: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    pictureUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};