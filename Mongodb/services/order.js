import db from "./database.js";
const { Order } = await db;

import { validateId } from "../helpers/index.js";

export const createOrder = async (req, res) => {
  const order = new Order(req.body);
  await order.save();

  res.status(200).send({ order });
};

export const updateOrder = async (req, res) => {
  if (!validateId(req.params.id))
    return res.status(400).send({ error: "Order not found" });

  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (!order) return res.status(404).send({ error: "Order not found" });

  res.status(200).send({ order });
};

export const getOrder = async (req, res) => {
  if (!validateId(req.params.id))
    return res.status(404).send({ error: "Order not found" });

  const order = await Order.findById(req.params.id)
    .populate("user", "-__v")
    .select("-__v");
  if (!order) return res.status(404).send({ error: "Order not found" });

  res.status(200).send({ order });
};

export const getOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "-__v").select("-__v");
  if (!orders) return res.status(404).send({ error: "No order found" });

  res.status(200).send({ orders });
};

export const deleteOrder = async (req, res) => {
  if (!validateId(req.params.id))
    return res.status(400).send({ error: "Order not found" });

  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).send({ error: "Order Not Found" });
  res.status(200).send({ order });
};
