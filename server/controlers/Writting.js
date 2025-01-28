const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.apiKey3 });
exports.Writting = async (req, res) => {
    const { selectedType, selectedCategory } = req.body;

    if (!selectedType || !selectedCategory) {
        return res.status(400).json({ message: "Please select type and category" });
    }

    try {
        // Construct the prompt dynamically based on user inputs
        const prompt = `Du bist ein Schreibassistent, der auf dem ausgewählten Typ: "${selectedType}" und der Kategorie: "${selectedCategory}" spezialisiert ist. Schreibe einen detaillierten und flüssigen Text über dieses Thema auf Deutsch, einschließlich Analysen, Einblicke oder passenden Informationen. Frage nicht nach weiteren Details, sondern schreibe einen umfassenden und informativen Beitrag zu diesem Thema.`; 

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "Du bist ein Schreibassistent, der professionelle und aufschlussreiche Kommentare, Analysen oder Artikel zu verschiedenen Themen liefert." },
                { role: "user", content: prompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
        });

        const response = chatCompletion.choices[0]?.message?.content;
        return res.status(200).json({ message: response });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while generating the response." });
    }
};

