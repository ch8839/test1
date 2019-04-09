/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ground_info', {
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
    point_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    point_depth: {
      type: "DOUBLE(30,8)",
      allowNull: true
    },
    ground_num: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sampling_time: {
      type: "DOUBLE(30,3)",
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
    point_monitor_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'ground_info'
  });
};
