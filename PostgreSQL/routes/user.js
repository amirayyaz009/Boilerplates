import express from "express";

import {
  createHandler,
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../helpers/index.js";
import * as user from "../services/user.js";

const router = express.Router();

// POST: Register user

router.post(
  "/register",
  createHandler(async (req, res) => {
    await user.registerUser(req, res);
  }, registerUserSchema)
);

// POST: Login user

router.post(
  "/login",
  createHandler(async (req, res) => {
    await user.loginUser(req, res);
  }, loginUserSchema)
);

// GET: Get user

router.get(
  "/:id",
  createHandler(async (req, res) => {
    await user.getOneUser(req, res);
  })
);

// GET: Get users

router.get(
  "/",
  createHandler(async (req, res) => {
    await user.getAllUsers(req, res);
  })
);

// PUT: Update user

router.put(
  "/:id",
  createHandler(async (req, res) => {
    await user.updateUser(req, res);
  }, updateUserSchema)
);

// DELETE: Delete user

router.delete("/:id", async (req, res) => {
  await user.deleteUser(req, res);
});

export default router;
