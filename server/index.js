import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/correct", async (req, res) => {
  try {
    const { sentence } = req.body;

    const prompt = `
You are an English tutor for beginners.

User sentence: "${sentence}"

Return JSON:
{
  "corrected": "...",
  "explanation": "...",
  "better": "..."
}
Return ONLY valid JSON.
Do not use backticks.
Do not add markdown.
Do not add explanations outside JSON.
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      
    });

    const text = response.choices[0].message.content;

    res.json(JSON.parse(text));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});