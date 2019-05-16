/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unit_info', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    PH:{
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arsenic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cadmium: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    chromium: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    copper: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lead: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mercury: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nickel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    antimony: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    beryllium: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cobalt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    zinc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    silver: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    thallium: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tin: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    selenium: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    molybdenum: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Alum: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'unit_info'
  });
};
