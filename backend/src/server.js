import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import itemRoutes from "./routes/item.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*", // later restrict to frontend URL
}));

app.use(express.json());

// Add our item routes
app.use("/api/items", itemRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});