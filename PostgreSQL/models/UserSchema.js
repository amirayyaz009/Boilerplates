import { DataTypes } from "sequelize";

const UserSchema = {
  name: "User",
  schema: {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  options: {
    paranoid: true,
    timestamps: true,
  },
};

export default UserSchema;
