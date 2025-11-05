
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "sk-proj-a_spucDrJz7dA0y-0aRAVFLd93aJdM2-w2aWP587qJ3IGm5AG5-Sq1BNFtKIaGUZHh8K_K6rypT3BlbkFJVDBOKt3vKNcKkWSY4a6P_0295MwGnHXo7xHtrVZngWn5eGCfylNjxSLM-_T0Ois1ErNUOGsP4Ask-or-v1-fbe7a4b3c658ff8a7d0282485c57e83f04714518ea0f71b2f564cd926c526eb6" });

async function testConnection() {
  try {
    console.log("🧠 Testing OpenAI connection...");
    const test = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say hello!" }],
    });
    console.log("✅ Success! OpenAI responded with:\n");
    console.log(test.choices[0].message.content);
  } catch (error) {
    console.error("❌ OpenAI API Error:", error.message);
  }
}

testConnection();
