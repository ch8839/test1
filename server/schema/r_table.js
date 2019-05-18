/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('r_table', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sample_num: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    assess_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    PH: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    arsenic: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    cadmium: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    chromium: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    copper: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    lead: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    mercury: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nickel: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    antimony: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    beryllium: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    cobalt: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    zinc: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    silver: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    thallium: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    tin: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    selenium: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    molybdenum: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Alum: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    attention: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'r_table'
  });
};
