import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const UserSchema = {
  name: "User",
  schema: new Schema(
    {
      profilePhoto: {
        type: String,
        default:
          "https://res.cloudinary.com/dvaosp831/image/upload/v1662815836/Mobile%20Zone/Assets/Blank-Profile_r3htzk.svg",
      },
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        trim: true,
      },
      role: {
        type: String,
        enum: ["ADMIN", "EDITOR", "CUSTOMER"],
        default: "CUSTOMER",
      },
    },
    {
      timestamps: true,
    }
  ),
};

UserSchema.schema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      profilePhoto: this.profilePhoto,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.PRIVATE_KEY
  );
  return token;
};

export default UserSchema;
