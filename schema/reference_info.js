/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reference_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PH: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    arsenic: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    cadmium: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    chromium: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    copper: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    lead: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    mercury: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    nickel: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    antimony: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    beryllium: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    cobalt: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    zinc: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    silver: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    thallium: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    tin: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    selenium: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    molybdenum: {
      type: "DOUBLE(30,3)",
      allowNull: true
    },
    Alum: {
      type: "DOUBLE(30,3)",
      allowNull: true
    }
  }, {
    tableName: 'reference_info'
  });
};
