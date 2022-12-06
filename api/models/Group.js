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
    // association that creates the GroupMembership join table with GroupId and UserId columns
    models.Group.belongsToMany(models.User, { through: 'GroupMembership' });
  };

  return Group;
};
