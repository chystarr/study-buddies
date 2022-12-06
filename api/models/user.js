const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    getFullname() {
      return [this.firstName, this.lastName].join(" ");
    }
  }

  User.init(
    {
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: { type: DataTypes.STRING },
      password: {
        type: DataTypes.VIRTUAL,
        validate: {
          isLongEnough: (val) => {
            if (val.length < 7) {
              throw new Error("Please choose a longer password");
            }
          },
        },
      },
      major: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = (models) => {
    // association that gives the Users table a SchoolId column
    models.User.belongsTo(models.School);
    // association that creates the GroupMembership join table with GroupId and UserId columns
    models.User.belongsToMany(models.Group, { through: 'GroupMembership' });
    // association that creates the ClassEnrollment join table with ClassId and UserId columns
    models.User.belongsToMany(models.Class, { through: 'ClassEnrollment' });

  };

  User.beforeSave((user, options) => {
    if (user.password) {
      user.passwordHash = bcrypt.hashSync(user.password, 10);
    }
  });

  return User;
};