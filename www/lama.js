const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: "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" });

// Define the function without exporting
async function prompt_groq_text(text, json) {
    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: text,
            },
        ],
        model: "llama-3.1-70b-versatile",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        ...(json ? { response_format: { type: "json_object" } } : {}),
        stop: null,
    });

    console.log("groq", response.choices[0]);
    return response.choices[0];
}

// Call the function in the same file
(async () => {
    try {
        const result = await prompt_groq_text("What is the capital of Ukraine?");
        console.log("Response:", result);
    } catch (error) {
        console.error("Error in API request:", error);
    }
})();
