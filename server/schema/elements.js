/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('elements', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    templateId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    x: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    y: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    type: {
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
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    zIndex: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    locking: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    active: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'elements'
  });
};
