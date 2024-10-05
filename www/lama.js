const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: "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" });

// Export the function directly
module.exports = async function (text, json) {
    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: text,
            },
        ],
        model: "llama-3.1-70b-versatile",
        stream: false,
        ...(json ? { response_format: { type: "json_object" } } : {}),
        stop: null,
    });

    console.log("groq", response.choices[0].message.content);
    return response.choices[0].message.content;
};
