const associations = async () => {
  const db = await import("./database.js");
  const { User, Order } = await db.default;

  // User with Order
  User.hasMany(Order, {
    foreignKey: "userId",
    as: "orders",
  });
  Order.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};

export default associations;
