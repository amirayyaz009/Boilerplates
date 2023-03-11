import express from "express";

import {
  createHandler,
  createOrderSchema,
  updateOrderSchema,
} from "../helpers/index.js";
import * as order from "../services/order.js";

const router = express.Router();

// POST: Create order

router.post(
  "/",
  createHandler(async (req, res) => {
    await order.createOrder(req, res);
  }, createOrderSchema)
);

// GET: Get order

router.get(
  "/:id",
  createHandler(async (req, res) => {
    await order.getOneOrder(req, res);
  })
);

// GET: Get orders

router.get(
  "/",
  createHandler(async (req, res) => {
    await order.getAllOrders(req, res);
  })
);

// PUT: Update order

router.put(
  "/:id",
  createHandler(async (req, res) => {
    await order.updateOrder(req, res);
  }, updateOrderSchema)
);

// DELETE: Delete order

router.delete("/:id", async (req, res) => {
  await order.deleteOrder(req, res);
});

export default router;
