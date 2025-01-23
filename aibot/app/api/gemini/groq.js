import fetch from 'node-fetch'; // Only needed for Node.js; not required in browsers

const url = "https://api.groq.com/openai/v1/chat/completions";
const apiKey = process.env.GROQ_API_KEY;

const requestBody = {
  messages: [{
    "role": "user",
    "content": "hi"
  }],
  model: "llama-3.3-70b-versatile",
  temperature: 1,
  max_completion_tokens: 1024,
  top_p: 1,
  stream: false,
  stop: null,
};

export async function makeRequest() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Assuming the response format has a `choices` array with `message.content`
    const assistantReply = data.choices && data.choices[0].message.content;
    
    console.log("Assistant's Response:", assistantReply);

  } catch (error) {
    console.error("Error:", error);
  }
}
