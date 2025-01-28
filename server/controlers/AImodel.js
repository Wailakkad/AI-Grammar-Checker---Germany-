const Groq = require("groq-sdk"); // Ensure the package name is correct (case-sensitive)
require("dotenv").config();

// Instantiate the Groq client with the API key from the environment variables
const groq = new Groq({ apiKey: process.env.apiKey });

const Checker = async (req, res) => {
    const { option, text } = req.body;

    if (!option || !text) {
        return res.status(400).json({ message: "Please provide 'option' (grammar or meaning) and 'text'." });
    }

    try {
        let description;

        if (option === "grammar") {
            description = `
        Correct grammatical errors in this sentence. This includes fixing issues with verb tenses, subject-verb agreement, punctuation, and word choice.
        
        Key Points to Avoid:
        1. Subject-Verb Agreement: Ensure the subject and verb match in number and tense.
        2. Tenses: Be careful with the use of past, present, and future tenses.
        3. Articles: Use the correct form of articles ("a", "an", "the").
        4. Punctuation: Ensure proper punctuation (e.g., periods, commas).
        5. Word Choice: Use the correct words for the specific context.
        
        Example:
        Incorrect: "She go to school every day."
        Corrected: "She goes to school every day."
        
        Example for practice:
        Incorrect: "Ich habe nach Deutschland gereist."
        Corrected: "Ich bin nach Deutschland gereist."
        
        Explanation for users:
        1. Subject-Verb Agreement: "Ich habe" should be "Ich bin" for movement verbs in the past tense.
        2. Tenses: Make sure the past tense verb is used correctly in this context.
        3. Articles: No articles needed for the phrase "nach Deutschland."
        4. Punctuation: Ensure proper punctuation for clarity.
        5. Word Choice: "Reisen" should be in the correct conjugation form for the past tense in this context.
        
            `;
        } else if (option === "meaning") {
            description = `
        Ensure this sentence makes logical sense and conveys the intended meaning. This involves checking for clarity, eliminating ambiguity, and ensuring the sentence is contextually appropriate.
        
        Key Points to Avoid:
        1. Clarity: Ensure your sentence clearly expresses the intended idea.
        2. Ambiguity: Avoid using words that could confuse the meaning.
        3. Context: Make sure the sentence fits the context properly.
        4. Conciseness: Avoid overly complicated phrasing and redundant words.
        
        Example:
        Incorrect: "I have bread drinking."
        Corrected: "I am drinking bread" (or "I am eating bread" depending on context).
        
        Example for practice:
        Incorrect: "Ich habe Brot trinken."
        Corrected: "Ich esse Brot" (or "Ich trinke etwas" depending on context).
        
        Explanation for users:
        1. Clarity: "Brot trinken" is confusing because it implies drinking bread, which is not logical.
        2. Ambiguity: The sentence could be interpreted as drinking bread, which is not a common phrase.
        3. Context: "Ich esse Brot" is the correct context for eating bread. Alternatively, "Ich trinke etwas" could be used if referring to drinking.
        4. Conciseness: Avoid redundancy by using clear, appropriate verbs in the context.
        
            `;
        } else {
            return res.status(400).json({ message: "Invalid option. Please choose 'grammar' or 'meaning'." });
        }
        

        const chatMessageCorrection = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `description: "${description}"\nText: "${text}"`
                }
            ],
            model: "llama3-8b-8192",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        });

        
    
        const response = chatMessageCorrection.choices[0]?.message?.content;
        if (!response) {
            return res.status(400).json({ message: "Failed to get a valid response." });
        }

        return res.status(200).json({ correctedText: response });

    } catch (err) {
        console.error("Error processing request:", err.message);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

module.exports = Checker;
