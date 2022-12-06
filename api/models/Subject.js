"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {}

  Subject.init(
    {
      subjectName: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Subject",
    }
  );

  Subject.associate = (models) => {
    // association that gives the Classes table a SubjectId column
    models.Subject.hasMany(models.Class);
  };

  return Subject;
};
