// Packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utils Packages
import connectDB from "./config/db.js";

// Routes Import
import userRoutes from "./routes/userRoutes.js";

// Env Configuration
dotenv.config();

const Port = process.env.PORT;

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/users", userRoutes);

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
  connectDB();
});
