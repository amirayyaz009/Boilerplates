import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = {
  name: "Order",
  schema: new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      orderItems: [],
      shippingAddress: {
        name: { type: String },
        address: { type: String },
        city: { type: String },
        postalCode: { type: String },
      },
      paymentMethod: {
        type: String,
        trim: true,
      },
      itemsPrice: {
        type: Number,
      },
      taxPrice: {
        type: Number,
      },
      totalPrice: {
        type: Number,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      isDelivered: {
        type: Boolean,
        default: false,
      },
      paidAt: {
        type: Date,
      },
      deliveredAt: {
        type: String,
      },
    },
    { timestamps: true }
  ),
};

export default OrderSchema;
