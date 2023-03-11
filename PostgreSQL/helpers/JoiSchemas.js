import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).required().label("Name"),
  email: Joi.string().email().min(3).required().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().min(3).required().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).label("Name"),
  password: Joi.string().min(6).label("Password"),
});

export const createOrderSchema = Joi.object({
  address: Joi.string().min(3).required().label("Address"),
  totalPrice: Joi.number().min(100).required().label("Total price"),
  isPaid: Joi.boolean().label("IsPaid"),
  isDelivered: Joi.boolean().label("IsDelivered"),
  userId: Joi.number().required().label("UserId"),
});

export const updateOrderSchema = Joi.object({
  address: Joi.string().min(3).label("Address"),
  totalPrice: Joi.number().min(100).label("Total price"),
  isPaid: Joi.boolean().label("IsPaid"),
  isDelivered: Joi.boolean().label("IsDelivered"),
  userId: Joi.number().label("IsDelivered"),
});
