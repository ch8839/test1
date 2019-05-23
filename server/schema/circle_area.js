/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('circle_area', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    project_num: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_num_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lng: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    log: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'circle_area'
  });
};
