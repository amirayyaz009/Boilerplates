import express from "express";
const router = express.Router();

import {
  createHandler,
  createOrderSchema,
  updateOrderSchema,
} from "../helpers/index.js";
import * as order from "../services/order.js";

// POST: Create an order

router.post(
  "/",
  createHandler(async (req, res) => {
    await order.createOrder(req, res);
  }, createOrderSchema)
);

// PUT: Update an order

router.put(
  "/:id",
  createHandler(async (req, res) => {
    await order.updateOrder(req, res);
  }, updateOrderSchema)
);

// GET: Get one order

router.get(
  "/:id",
  createHandler(async (req, res) => {
    await order.getOrder(req, res);
  })
);

// GET: Get all orders

router.get(
  "/",
  createHandler(async (req, res) => {
    await order.getOrders(req, res);
  })
);

// DELETE: Delete an order

router.delete(
  "/:id",
  createHandler(async (req, res) => {
    await order.deleteOrder(req, res);
  })
);

export default router;
