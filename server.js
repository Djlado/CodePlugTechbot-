const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = "REPLACE_WITH_YOUR_API_KEY";

app.use(bodyParser.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  const text = req.body.text || "";
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: text }] }]
      })
    });
    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    res.json({ reply });
  } catch (error) {
    res.json({ reply: "Error talking to Gemini." });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));