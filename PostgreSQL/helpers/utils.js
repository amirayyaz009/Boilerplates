import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateAuthToken = (values) => {
  const token = jwt.sign(values, process.env.PRIVATE_KEY);
  return token;
};
