/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sample_ground_statistic_value', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    statistic_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    assess_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sample_cave: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    point_num: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PH: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    arsenic: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    cadmium: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    chromium: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    copper: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    lead: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    mercury: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    nickel: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    antimony: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    beryllium: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    cobalt: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    zinc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    silver: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    thallium: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    tin: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    selenium: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    molybdenum: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    },
    Alum: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '-1'
    }
  }, {
    tableName: 'sample_ground_statistic_value'
  });
};
