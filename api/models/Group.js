"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {}

  Group.init(
    {
      groupName: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Group",
    }
  );

  Group.associate = (models) => {
    // association that gives a the Groups table a ClassId column
    models.Group.belongsTo(models.Class);
  };

  return Group;
};
