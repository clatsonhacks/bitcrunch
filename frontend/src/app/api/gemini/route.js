import Globalapi from "@/_utils/Globalapi"
import { handleCategory } from "./handleCategories"
import { handleCombined } from "./whatif"
import fetch from "node-fetch"

const url = "https://api.groq.com/openai/v1/chat/completions"
const apiKey = process.env.GROQ_API_KEY

export async function POST(req) {
  try {
    const { prompt, isQuestionActive } = await req.json()
    const thinkingProcess = []

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      })
    }

    thinkingProcess.push("Analyzing user query...")

    // Define category prompt
    const categoryPrompt = `
      1. Asked question is related to NFT collection,
      2. Asked question is related to NFT price estimation,
      3. Asked question is related to NFT gaming metrics,
      4. Other info related to NFTs
    `

    const whatIfPrompt = `
    1. Asked question is to predict the future value of a nft,
    2. Asked question is to predict the best day for buying the nft and risk analysis,
    3. Asked question is to predict the best day for selling the nft and risk analysis,
    4. Asked question is not relevant to any
    `

    let formattedPrompt = `Analyze user query: "${prompt}" . `

    if (isQuestionActive) {
      formattedPrompt += `based on the following "${whatIfPrompt}" and provide the number in api_category. Also, analyze the time prompted by the user. Respond ONLY with a valid JSON object in this exact format, with no additional text: 
  {
    "api_category": <integer>,
    "timestamp_data": {
      "year": <integer>,
      "month": <integer>,
      "day": <integer>,
      "hour": <integer>,
      "minute": <integer>
    }
  }
  If specific time data is not provided, use the following defaults:
  year: 2025, month: 1, day: 1, hour: 0, minute: 0.`
    } else {
      formattedPrompt += `Also categorize based on the following: "${categoryPrompt}". Respond with the category number only.`
    }

    const requestBody = {
      messages: [
        {
          role: "user",
          content: formattedPrompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    }

    // Function to handle API requests
    async function makeRequest(body) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        return data.choices?.[0]?.message?.content || null
      } catch (error) {
        console.error("Error during API request:", error)
        return null
      }
    }

    // Analyze category and extract timestamp if isQuestionActive
    thinkingProcess.push("Determining category of the query...")
    const analysisResult = await makeRequest(requestBody)

    if (!analysisResult) {
      return new Response(JSON.stringify({ error: "Error fetching category analysis", thinkingProcess }), {
        status: 500,
      })
    }

    let categoryNumber, timestampData
    if (isQuestionActive) {
      try {
        const parsedResult = JSON.parse(analysisResult)
        categoryNumber = parsedResult.api_category.toString()
        timestampData = parsedResult.timestamp_data
      } catch (error) {
        console.error("Error parsing JSON:", error)
        console.log("Raw API response:", analysisResult)
        return new Response(JSON.stringify({ error: "Invalid response format", thinkingProcess }), { status: 500 })
      }
    } else {
      categoryNumber = analysisResult.replace(/\D/g, "") || "4" 
    }

    thinkingProcess.push(`Category identified: ${categoryNumber}`)
    const contract = await Globalapi.getAddress();
    if (isQuestionActive) {
      thinkingProcess.push("Running prediction model...")
      try {
        let whatIfResult;
        let descriptivePrompt;
        if (categoryNumber == "1") {
          whatIfResult = await handleCombined(categoryNumber, {
            ...timestampData,
            contract_address: contract,
          })
          
          descriptivePrompt = `Based on the following prediction result for an NFT: ${JSON.stringify(whatIfResult.whatIf)}, 
        provide a detailed analysis and explanation of the prediction. Include insights on potential price changes, 
        market trends, and any other relevant information. Format the response with markdown for readability.`
        }
        else if (categoryNumber == "2")
        {
          whatIfResult=await handleCombined(categoryNumber, {
            ...timestampData,
            contract_address: contract,
          })

          console.log("Risk Analysis "+JSON.stringify(whatIfResult));

          descriptivePrompt = `Based on the following prediction result for an NFT: ${JSON.stringify(whatIfResult.risk)}, 
        provide a detailed analysis and explanation of only the "best_day_to_buy" data and "risk_score" data. Provide a concise 
        explanation of within 15 lines.Provide the descriptive data and use bold fonts wherever necessary`
        }
        else if(categoryNumber=='3'){
          whatIfResult=await handleCombined(categoryNumber, {
            ...timestampData,
            contract_address: contract,
          })

          console.log("Risk Analysis "+JSON.stringify(whatIfResult));

          descriptivePrompt = `Based on the following prediction result for an NFT: ${JSON.stringify(whatIfResult.risk)}, 
        provide a detailed analysis and explanation of only the "best_day_to_sell" data and "risk_score" data. Provide a concise 
        explanation of within 15 lines.Provide the descriptive data and use bold fonts wherever necessary`
        }
        else
        {
          descriptivePrompt = `Mention that the provided prompt is irrelevant and give the normal knowledge according to the prompt "${prompt}"`
        }

        const graphData = whatIfResult.graph;
        
          if(graphData){
            fetch('https://bitcrunch-backend.vercel.app/api/save-hourly-data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ graphData }), // sending graphData in the request body
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Data saved successfully:', data);
              })
              .catch((error) => {
                console.error('Error saving data:', error);
              });
          }
           

        const descriptiveRequestBody = {
          messages: [
            {
              role: "user",
              content: descriptivePrompt,
            },
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_completion_tokens: 1024,
          top_p: 1,
          stream: false,
          stop: null,
        }

        thinkingProcess.push("Generating descriptive analysis of the prediction...")
        const descriptiveResult = await makeRequest(descriptiveRequestBody)

        if (descriptiveResult) {
          thinkingProcess.push("Analysis generated successfully.")
          return new Response(
            JSON.stringify({
              finalResponse: descriptiveResult,
              rawPrediction: whatIfResult,
              thinkingProcess,
            }),
            { status: 200 },
          )
        } else {
          throw new Error("Failed to generate descriptive analysis")
        }
      } catch (error) {
        console.error("Error in whatIf module or descriptive analysis:", error)
        return new Response(JSON.stringify({ error: "Error processing what-if scenario", thinkingProcess }), {
          status: 500,
        })
      }
    }

    const explanationPrompt = `Explain briefly why you categorized the query "${prompt}" as category ${categoryNumber}.`
    const explanationRequestBody = {
      messages: [
        {
          role: "user",
          content: explanationPrompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 100,
      top_p: 1,
      stream: false,
      stop: null,
    }

    let categoryData = {}
    let ansPrompt = ""

    switch (categoryNumber) {
      case "1":
        thinkingProcess.push("Retrieving NFT collection data...")
        categoryData = await handleCategory("1")
        ansPrompt = `Based on the query "${prompt}", respond using the following data: "${JSON.stringify(
          categoryData,
        )}". Format the response with markdown for **bold** and *italic* text wherever necessary and provide a decriptive format in a point by point manner, and ensure no links are displayed.`
        break
      case "2":
        thinkingProcess.push("Analyzing NFT price estimation data...")
        categoryData = await handleCategory("2")
        ansPrompt = `Based on the query "${prompt}", provide a response using this data: "${JSON.stringify(
          categoryData,
        )}". Format the response with markdown for **bold** and *italic* text wherever necessary and provide a decriptive format in a point by point manner, and ensure no links are displayed`
        break
      case "3":
        thinkingProcess.push("Gathering NFT gaming metrics...")
        categoryData = await handleCategory("3")
        ansPrompt = `Based on the query "${prompt}", use the following data: "${JSON.stringify(
          categoryData,
        )}" Format the response with markdown for **bold** and *italic* text wherever necessary and provide a decriptive format.The answer should be concise to the topic asked`
        break
      case "4":
        thinkingProcess.push("Retrieving general NFT information...")
        categoryData = await handleCategory("4")
        ansPrompt = `Based on the query "${prompt}", provide a detailed response using your existing NFT knowledge. Include numerical examples where applicable.`
        break
      default:
        categoryData = { message: "No specific data available for this category." }
    }

    thinkingProcess.push("Generating response based on category data...")

    if (ansPrompt) {
      const secondRequestBody = {
        messages: [
          {
            role: "user",
            content: ansPrompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
      }

      const finalResult = await makeRequest(secondRequestBody)

      if (finalResult) {
        thinkingProcess.push("Response generated successfully.")
        return new Response(
          JSON.stringify({
            finalResponse: finalResult,
            categoryData,
            thinkingProcess,
          }),
          { status: 200 },
        )
      }
    }

    // Fallback if no valid final response
    thinkingProcess.push("No valid response available.")
    return new Response(
      JSON.stringify({
        finalResponse: "No valid response available.",
        categoryData,
        thinkingProcess,
        categoryExplanation,
      }),
      { status: 200 },
    )
  } catch (error) {
    console.error("Error during request handling:", error)
    return new Response(
      JSON.stringify({ error: "Internal Server Error", thinkingProcess: ["An error occurred during processing."] }),
      { status: 500 },
    )
  }
}
