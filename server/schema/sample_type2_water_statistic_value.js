/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sample_type2_water_statistic_value', {
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
    point_num: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sample_depth: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sample_type2_water_statistic_value'
  });
};