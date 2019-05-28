/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('area_map', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    area_num: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    area_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'area_map'
  });
};
