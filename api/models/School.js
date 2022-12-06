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
    // association that gives the Classes table a SchoolId column
    models.School.hasMany(models.Class);
    // association that gives the Users table a SchoolId column
    models.School.hasMany(models.User);
  };

  return School;
};
