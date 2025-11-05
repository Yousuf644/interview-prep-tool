import express from "express";
const router = express.Router();

import { generateAIQuestion } from "../controllers/aiController.js";

const routes = express.Router();
router.get("/test", (req, res) => {
  res.json({ message: "AI route working!" });
});

router.post("/generate", generateAIQuestion);

export default router;
