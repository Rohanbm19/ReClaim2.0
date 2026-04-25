import express from "express";
import {
  createClaim,
  getMyClaims,
} from "../controllers/claim.controller.js";

const router = express.Router();

router.post("/", createClaim);
router.get("/my", getMyClaims);

export default router;