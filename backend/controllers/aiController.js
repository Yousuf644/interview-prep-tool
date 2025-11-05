import dotenv from "dotenv";
dotenv.config();

export const generateAIQuestion = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    const prompt = `Generate 5 ${difficulty}-level interview questions and their detailed answers for the topic: ${topic}.
Return the result as a valid JSON array like:
[
  {"questionText": "Question?", "answer": "Answer."}
]`;

    console.log("🧠 Sending prompt to OpenRouter...");

    // ✅ Direct API request using fetch
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ correct auth
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // ✅ required by OpenRouter
        "X-Title": "Interview Prep Tool",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenRouter API error: ${err}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log("✅ Response received from OpenRouter!");

    // ✅ Clean Markdown formatting before parsing
    let cleanedContent = content
      .replace(/```json/g, "")  // remove opening ```json
      .replace(/```/g, "")      // remove closing ```
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedContent);
    } catch (err) {
      console.error("⚠️ JSON parsing failed, returning raw content:", err.message);
      parsed = [{ questionText: "Parsing failed", answer: cleanedContent }];
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error("❌ AI Generation Error:", error.message);
    res.status(500).json({
      error: "Failed to generate interview questions",
      message: error.message,
    });
  }
};
