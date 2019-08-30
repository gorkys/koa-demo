/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('template', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    width: {
      type: "DOUBLE",
      allowNull: true
    },
    height: {
      type: "DOUBLE",
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    proTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resolution: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    terminalType: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'template'
  });
};
