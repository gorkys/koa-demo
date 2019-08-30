/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('setting', {
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
    resourceAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    switchEffects: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    admissionEffect: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    textContent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    textColor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bgColor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bold: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    italic: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    underline: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    align: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    speed: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    direction: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    fontSize: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    font: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    templateId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    elementsId: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'setting'
  });
};
