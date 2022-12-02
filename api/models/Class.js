"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {}

  Class.init(
    {
      className: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Class",
    }
  );

  Class.associate = (models) => {
    // associations can be defined here
  };

  return Class;
};
