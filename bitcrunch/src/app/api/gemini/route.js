import { handleCategory } from "./handleCategories";
import fetch from 'node-fetch'; 

const url = "https://api.groq.com/openai/v1/chat/completions";
const apiKey = process.env.GROQ_API_KEY;

export async function POST(req) {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response(
      JSON.stringify({ error: "Prompt is required" }),
      { status: 400 }
    );
  }

  const category = `1. Asked question is related to NFT collection, 2. Asked question related to NFT price estimation, 3. Asked question related to NFT gaming metrics, 4. Other info related to NFT`;
  const formatted_prompt = `Analyze user query: "${prompt}" and categorize based on the "${category}", answer with the category number alone`;

  const requestBody = {
    messages: [{
      "role": "user",
      "content": `"${formatted_prompt}"`
    }],
    model: "llama-3.3-70b-versatile",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  };

  async function makeRequest(body) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      return data.choices && data.choices[0].message.content;
    } catch (error) {
      console.error("Error:", error);
      return null; 
    }
  }

  try {
    const result = await makeRequest(requestBody); 

    if (!result) {
      return new Response(JSON.stringify({ error: "Error fetching response from Groq API" }), { status: 500 });
    }

    const textContent = result || 'No valid response';
    const categoryNumber = textContent.replace(/\D/g, "");

    let categoryData = {};
    let ansprompt = "";

    if (categoryNumber === "1") {
      categoryData = await handleCategory("1");
      ansprompt = `According to the prompt "${prompt}", answer with the following data "${JSON.stringify(categoryData)}" as a sample and provide a response formatted with markdown for bold and italic text where applicable.Links should be clickable in the markdown response.`;
    } else if (categoryNumber === "2") {
      categoryData = await handleCategory("2");
      ansprompt = `According to the prompt "${prompt}", provide answer using the following data "${JSON.stringify(categoryData)}.Ensure any links in the response are clickable using markdown format like [Link Text](URL)."`;
    } else if (categoryNumber === "3") {
      categoryData = await handleCategory("3");
      ansprompt = `According to the prompt "${prompt}", provide answer using the following data "${JSON.stringify(categoryData)}.Ensure any links in the response are clickable using markdown format like [Link Text](URL).Provide the answers in a descriptive format."`;
    } else if (categoryNumber === "4") {
      categoryData = await handleCategory("4");
      ansprompt = `According to the prompt "${prompt}", provide answer using the NFT datas that you already have a clarity about.Ensure any links in the response are clickable using markdown format like [Link Text](URL).Provide the answers in a descriptive format.You can also include numerical formats"`;
    } else {
      categoryData = { message: "No specific data available for this category." };
    }

    if (ansprompt) {
      
      const secondRequestBody = {
        messages: [{
          "role": "user",
          "content": `"${ansprompt}"`
        }],
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
      };

      const finalResult = await makeRequest(secondRequestBody); 

      return new Response(JSON.stringify({ text: finalResult, categoryData }), { status: 200 });
    }

    return new Response(JSON.stringify({ text: textContent, categoryData }), { status: 200 });

  } catch (error) {
    console.error('Error during API request:', error);
    return new Response('Error fetching response from Gemini API', { status: 500 });
  }
}