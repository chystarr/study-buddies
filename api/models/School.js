"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class School extends Model {}

  School.init(
    {
      schoolName: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "School",
    }
  );

  School.associate = (models) => {
    // associations can be defined here
  };

  return School;
};
