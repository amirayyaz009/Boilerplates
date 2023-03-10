const jwt = require("jsonwebtoken");

const withAuth = (roles) => {
  return (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .send({ error: "Access denied! No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      if (roles.length < 1) {
        req.user = decoded;
        next();
        return;
      }
      const permitted = roles.some((role) => role == decoded.role);
      if (permitted) {
        req.user = decoded;
        next();
      } else {
        return res.status(403).send({ error: "Access denied! forbidden" });
      }
    } catch (error) {
      res.status(400).send({ error: "Invalid Token" });
    }
  };
};

module.exports = withAuth;
