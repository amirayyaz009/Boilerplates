import express from "express";
const router = express.Router();

import {
  createHandler,
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../helpers/index.js";
import * as user from "../services/user.js";

// POST: Register a User

router.post(
  "/register",
  createHandler(async (req, res) => {
    await user.registerUser(req, res);
  }, registerUserSchema)
);

// POST: Login a User

router.post(
  "/login",
  createHandler(async (req, res) => {
    await user.loginUser(req, res);
  }, loginUserSchema)
);

// GET: Get One User

router.get(
  "/:id",
  createHandler(async (req, res) => {
    await user.getOneUser(req, res);
  })
);

// GET: Get All Users

router.get(
  "/",
  createHandler(async (req, res) => {
    await user.getAllUsers(req, res);
  })
);

// PUT: Update a User

router.put(
  "/:id",
  createHandler(async (req, res) => {
    await user.updateUser(req, res);
  }, updateUserSchema)
);

// DELETE: Delete a User

router.delete(
  "/:id",
  createHandler(async (req, res) => {
    await user.deleteUser(req, res);
  })
);

export default router;
