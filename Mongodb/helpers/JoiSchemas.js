import Joi from "joi";
import objectId from "joi-objectid";
Joi.ObjectId = objectId(Joi);

export const registerUserSchema = Joi.object({
  profilePhoto: Joi.string().label("Profile Photo"),
  name: Joi.string().min(4).required().label("Name"),
  email: Joi.string().min(4).required().email().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().min(3).required().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});

export const updateUserSchema = Joi.object({
  profilePhoto: Joi.string().label("Profile Photo"),
  name: Joi.string().min(3).label("Name"),
  password: Joi.string().min(6).label("Password"),
});

export const createOrderSchema = Joi.object({
  address: Joi.string().min(3).required().label("Address"),
  totalPrice: Joi.number().min(100).required().label("Total price"),
  isPaid: Joi.boolean().label("IsPaid"),
  isDelivered: Joi.boolean().label("IsDelivered"),
  user: Joi.ObjectId().required(),
});

export const updateOrderSchema = Joi.object({
  address: Joi.string().min(3).label("Address"),
  totalPrice: Joi.number().min(100).label("Total price"),
  isPaid: Joi.boolean().label("IsPaid"),
  isDelivered: Joi.boolean().label("IsDelivered"),
  userId: Joi.number().label("IsDelivered"),
});
