/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('list2', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    number: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'list2'
  });
};
