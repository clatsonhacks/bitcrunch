import { GoogleGenerativeAI } from "@google/generative-ai";
import { handleCategory } from "./handleCategories";
import { makeRequest } from "./groq";


export async function POST(req) {
  const { prompt } = await req.json();
 


  if (!prompt) {
    return new Response(
      JSON.stringify({ error: "Prompt is required" }),
      { status: 400 }
    );
  }


  const apikey = process.env.GEMINI_API_KEY;
  console.log('API Key:', process.env.GEMINI_API_KEY);
  const genAI = new GoogleGenerativeAI(apikey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const category = `1. Asked question is related to NFT collection, 2. Asked question related to NFT price estimation, 3. Asked question related to trends, 4. Other`;
  const formatted_prompt = `Analyze user query: "${prompt}" and categorize based on the "${category}", answer with the category number alone`;


  try {
    const result = await model.generateContent(formatted_prompt);


    console.log('API Response:', result);


    const candidates = result.response.candidates && result.response.candidates[0];
    const textContent = candidates ? await candidates.content.parts[0].text : 'No valid response';


    const categoryNumber = textContent.replace(/\D/g, "");


    let categoryData = {};
    let ansprompt = "";


    if (categoryNumber === "1") {
      categoryData = await handleCategory("1");
      ansprompt = `According to the prompt "${prompt}", answer with the following data "${JSON.stringify(categoryData)}" as a sample and provide a response formatted with markdown for bold and italic text where applicable. `;
    }
    else if (categoryNumber === "2") {
      categoryData = await handleCategory("2");
      ansprompt = `According to the prompt "${prompt}", provide answer using the following data "${JSON.stringify(categoryData)}"`;
    }
    else {
      categoryData = { message: "No specific data available for this category." };
    }


    console.log("Category Data:", categoryData);


    if (ansprompt) {


      const finalResult = await model.generateContent(ansprompt);


      const finalCandidates = finalResult.response.candidates && finalResult.response.candidates[0];
      const finalText = finalCandidates ? await finalCandidates.content.parts[0].text : 'No valid response from second call';


      console.log("Final Result:", finalText);
      makeRequest();


      return new Response(JSON.stringify({ text: finalText, categoryData }), {
        status: 200,
      });
    }


    return new Response(JSON.stringify({ text: textContent, categoryData }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error during API request:', error);
    return new Response('Error fetching response from Gemini API', { status: 500 });
  }
}
