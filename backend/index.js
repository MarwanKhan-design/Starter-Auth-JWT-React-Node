// Imports
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";

// Import Routes
import UserRoutes from "./routes/user.js";
import AuthRoutes from "./routes/auth.js";
import PostRoutes from "./routes/post.js";

// App
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/post", PostRoutes);

// Listeners
mongoose.connect(
  "mongodb://127.0.0.1:27017/jwt-auth",
  { useNewUrlParser: true },
  () => console.log("connected to DB")
);

app.listen(3000, () => console.log("App running on port 3000"));
