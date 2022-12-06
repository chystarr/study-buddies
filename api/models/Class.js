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
    // association that gives a the Groups table a ClassId column
    models.Class.hasMany(models.Group);
    // associations that give the Classes table SubjectId and SchoolId columns
    models.Class.belongsTo(models.Subject);
    models.Class.belongsTo(models.School);
    // association that creates the ClassMembership join table with ClassId and UserId columns
    models.Class.belongsToMany(models.User, { through: 'ClassEnrollment' });
  };

  return Class;
};
