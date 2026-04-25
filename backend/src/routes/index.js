import express from "express";
import itemRoutes from "./item.routes.js";
import claimRoutes from "./claim.routes.js";

const router = express.Router();

// ✅ IMPORTANT
router.use("/items", itemRoutes);
router.use("/claims", claimRoutes);

export default router;