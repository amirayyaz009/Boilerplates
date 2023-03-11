import { DataTypes } from "sequelize";

const OrderSchema = {
  name: "Order",
  schema: {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  options: {
    paranoid: true,
    timestamps: true,
  },
};

export default OrderSchema;
