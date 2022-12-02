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
    // associations can be defined here
  };

  return Group;
};
