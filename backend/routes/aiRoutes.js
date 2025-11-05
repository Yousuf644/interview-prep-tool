import express from "express";
const router = express.Router();

// Mock AI generation route
router.post("/generate", async (req, res) => {
  const { topic, difficulty } = req.body;
  res.json([
    {
      questionText: `What is ${topic}?`,
      answer: `${topic} is a concept often discussed at ${difficulty} level interviews.`,
    },
  ]);
});

export default router;
