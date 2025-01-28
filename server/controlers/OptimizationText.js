const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.apiKey4 });

const Optimize = async (req, res) => {
  const { Text, Type } = req.body;

  // Validate input
  if (!Text || !Type) {
    return res.status(400).json({ message: "Please enter both text and type." });
  }

  try {
    // Generate the prompt based on the optimization type
    let prompt = "";
    if (Type === "Short") {
      prompt = `Optimize the following German text to be more concise while maintaining its meaning and tone:\n\n"${Text}"`;
    } else if (Type === "Long") {
      prompt = `Optimize the following German text to expand its content with additional details and descriptive language while maintaining its meaning and tone:\n\n"${Text}"`;
    } else {
      return res.status(400).json({ message: "Invalid optimization type provided." });
    }

    // Call the Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a skilled German text optimization assistant." },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false, // Change to true if streaming is required and implement stream handling
      stop: null,
    });

    const response = chatCompletion.choices[0]?.message?.content;
    if (!response) {
      return res.status(400).json({ message: "No response from the model." });
    }

    // Send the optimized text back to the client
    res.status(200).json({
      message: "Optimized response from the model.",
      response,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while processing the request.", error: err.message });
  }
};

module.exports = Optimize;
