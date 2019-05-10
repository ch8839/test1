/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_area: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_num: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    project_lng: {
      type: "DOUBLE(30,10)",
      allowNull: true
    },
    project_lat: {
      type: "DOUBLE(30,10)",
      allowNull: true
    },
    simple_count: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    detail_count: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    fixed_count: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    all_count: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'project_info'
  });
};
