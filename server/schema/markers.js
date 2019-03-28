/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('markers', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      lng: {
        type: "DOUBLE(30,10)",
        allowNull: true
      },
      lat: {
        type: "DOUBLE(30,10)",
        allowNull: true
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      count: {
        type: DataTypes.INTEGER(255),
        allowNull: true
      },
    }, {
      tableName: 'markers'
    });
  };
  