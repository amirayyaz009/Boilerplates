import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";

import user from "./routes/user.js";
import order from "./routes/order.js";

const app = express();

// Middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({ exposedHeaders: "x-auth" }));
app.use(helmet());
app.use(compression());

// Routes
app.use("/api/user", user);
app.use("/api/order", order);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
