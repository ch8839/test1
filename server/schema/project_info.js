/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    area: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ground_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ground_num: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ground_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    assess_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ground_lng: {
      type: "DOUBLE(30,10)",
      allowNull: true
    },
    ground_lat: {
      type: "DOUBLE(30,10)",
      allowNull: true
    },
    monitor_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    count: {
      type: DataTypes.STRING(11),
      allowNull: true
    }
  }, {
    tableName: 'project_info'
  });
};
