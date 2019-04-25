/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('point_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    point_num: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_num: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    point_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    point_lng: {
      type: "DOUBLE(30,10)",
      allowNull: true
    },
    point_lat: {
      type: "DOUBLE(30,10)",
      allowNull: true
    },
    point_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'point_info'
  });
};
