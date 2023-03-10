import bcrypt from "bcrypt";

import db from "./database.js";
import { hashPassword, validateId } from "../helpers/index.js";

const { User } = await db;

export const registerUser = async (req, res) => {
  const email = req.body.email.toLowerCase();

  const userCheck = await User.findOne({ email });
  if (userCheck) return res.status(400).send({ error: "User already exist" });

  req.body.email = email;
  const user = new User(req.body);
  user.password = await hashPassword(user.password);

  await user.save();

  const token = user.generateAuthToken();

  res.status(200).header({ "x-auth": token }).send({ user });
};

export const loginUser = async (req, res) => {
  const email = req.body.email.toLowerCase();

  let user = await User.findOne({ email });
  if (!user)
    return res.status(400).send({ error: "Invalid email or password" });

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid)
    return res.status(400).send({ error: "Invalid email or password" });

  const token = user.generateAuthToken();

  res.status(200).header({ "x-auth": token }).send({ user });
};

export const getOneUser = async (req, res) => {
  const isValid = validateId(req.params.id);
  if (!isValid) return res.status(404).send({ error: "User not found" });
  const user = await User.findById(req.params.id).select("-password -__v");
  if (!user) return res.status(404).send({ error: "User not found" });
  res.status(200).send({ user });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password -__v");

  if (users.length === 0)
    return res.status(404).send({ error: "No user found" });

  res.status(200).send({ users });
};

export const updateUser = async (req, res) => {
  const isValid = validateId(req.params.id);
  if (!isValid) return res.status(404).send({ error: "User not found" });
  let updatedUser;
  if (req.body.password) {
    updatedUser = req.body;
    updatedUser.password = await hashPassword(updatedUser.password);
  } else {
    updatedUser = req.body;
  }
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedUser },
    { new: true }
  );

  if (!user) return res.status(404).send({ error: "User not found" });

  const token = user.generateAuthToken();

  res
    .status(200)
    .header({ "x-auth": token })
    .send({ user, message: "User updated successfully" });
};

export const deleteUser = async (req, res) => {
  const isValid = validateId(req.params.id);
  if (!isValid) return res.status(404).send({ error: "User not found" });
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });
  res.status(200).send({ user, message: "User deleted successfully" });
};
