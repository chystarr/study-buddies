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
    // associations can be defined here
  };

  return Subject;
};
