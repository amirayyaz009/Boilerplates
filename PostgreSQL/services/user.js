import bcrypt from "bcrypt";
import db from "./database.js";
import { hashPassword, generateAuthToken } from "../helpers/index.js";

const { User, Order } = await db;

export const registerUser = async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  let emailCheck = await User.findOne({
    where: { email: email },
    paranoid: false,
  });
  if (emailCheck)
    return res.status(400).send({ error: "User with email already exist" });

  req.body.password = await hashPassword(req.body.password);

  const userCheck = await User.create(req.body);

  const user = userCheck.toJSON();
  delete user.password;

  const token = generateAuthToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  res.status(200).header({ "x-auth": token }).send({ user });
};

export const loginUser = async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  let userCheck = await User.findOne({ where: { email: email } });
  if (!userCheck)
    return res.status(400).send({ error: "Invalid Email or Password" });

  const user = userCheck.toJSON();
  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid)
    return res.status(400).send({ error: "Invalid Email or Password" });

  delete user.password;

  const token = generateAuthToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  res.status(200).header({ "x-auth": token }).send({ user });
};

export const getOneUser = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password", "deletedAt"] },
    include: [
      {
        model: Order,
        as: "orders",
      },
    ],
  });

  if (!user) return res.status(404).send({ error: "User not found" });

  res.status(200).send({ user });
};

export const getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "deletedAt"] },
  });

  if (users.length === 0)
    return res.status(404).send({ error: "No user found" });

  res.status(200).send({ users });
};

export const updateUser = async (req, res) => {
  const userCheck = await User.findByPk(req.params.id);

  if (!userCheck) return res.status(400).send({ message: "User not found" });
  const user = userCheck.toJSON();

  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }

  const updatedUser = {
    name: req.body.name,
    password: req.body.password,
  };

  await User.update(updatedUser, {
    where: {
      id: req.params.id,
    },
  });

  const token = generateAuthToken({
    id: user.id,
    name: updatedUser.name || user.name,
    email: user.email,
  });

  res.status(200).header({ "x-auth": token }).send({
    message: "User Updated Successfully",
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).send({ error: "User not found" });

  res.status(200).send({
    message: "User deleted successfully",
  });
};
