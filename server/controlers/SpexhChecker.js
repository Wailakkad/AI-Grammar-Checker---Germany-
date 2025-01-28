const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.apiKey2 });

const CheckerSpecker = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Please provide 'text' for correction." });
  }

  try {
    // Generating a prompt to automatically check grammar and meaning
    const prompt = `
The user has spoken the following text in German: "${text}".
Please check the text for:
- Grammar mistakes, including verb conjugation, word order, and spelling.
- Meaning mistakes, including unclear phrases or wrong word choices.
- Provide a corrected version of the text and an explanation in German for each correction.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a language assistant skilled in German grammar and meaning correction." },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const response = chatCompletion.choices[0]?.message?.content;
    if (!response) {
      return res.status(400).json({ message: "Failed to get a valid response." });
    }

    return res.status(200).json({ correctedText: response });
  } catch (err) {
    console.error("Error processing request:", err.message);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};

module.exports = CheckerSpecker;
