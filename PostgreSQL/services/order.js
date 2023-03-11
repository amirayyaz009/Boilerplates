import db from "./database.js";

const { Order, User } = await db;

export const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(200).send({ order });
};

export const getOneOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "user",
      },
    ],
  });

  if (!order) return res.status(404).send({ error: "Order not found" });

  res.status(200).send({ order });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.findAll();

  if (orders.length === 0)
    return res.status(404).send({ error: "No order found" });

  res.status(200).send({ orders });
};

export const updateOrder = async (req, res) => {
  const orderCheck = await Order.findByPk(req.params.id);

  if (!orderCheck) return res.status(400).send({ message: "Order not found" });

  await Order.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  res.status(200).send({
    message: "Order Updated Successfully",
  });
};

export const deleteOrder = async (req, res) => {
  const order = await Order.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!order) return res.status(404).send({ error: "Order not found" });

  res.status(200).send({
    message: "Order deleted successfully",
  });
};
