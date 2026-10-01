import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import itemRoutes from "./routes/item.routes.js";

dotenv.config();

const app = express();
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/reclaim2";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || process.env.FRONTEND_URL || "*",
  })
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/items", itemRoutes);

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});