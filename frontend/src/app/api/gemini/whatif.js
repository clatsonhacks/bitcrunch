import fetch from "node-fetch"

// Define the API endpoints
const PREDICT_URL = "https://bitcrunch.onrender.com/predict/"
const PREDICTED_PRICES_URL = "https://bitcrunch-1.onrender.com/predicted_prices/"
const RISK_ANALYSIS_URL="https://bitcrunch-risk.onrender.com/process-data"

async function handleWhatIf(data) {
  const requestData = {
    contract_address: data.contract_address,
    timestamp_data: {
      year: data.year,
      month: data.month,
      day: data.day,
      hour: data.hour,
      minute: data.minute,
    },
  }

  try {
    const response = await fetch(PREDICT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })

    if (response.ok) {
      const result = await response.json()
      console.log("Prediction Result:", result)
      return {
        whatIfResult: result,
        categoryData: requestData,
      }
    } else {
      console.error(`Failed to get a response. Status code: ${response.status}`)
      const errorText = await response.text()
      console.error("Response Text:", errorText)
      throw new Error(`API request failed with status ${response.status}`)
    }
  } catch (error) {
    console.error("Error in handleWhatIf:", error)
    throw error
  }
}

async function handleRisk(data) {
  const reqData = {
    contract_address: data.contract_address
  }

  try {
    const response = await fetch(RISK_ANALYSIS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    })

    if (response.ok) {
      const result = await response.json()
      console.log("Prediction Result:", result)
      return result;
    } else {
      console.error(`Failed to get a response. Status code: ${response.status}`)
      const errorText = await response.text()
      console.error("Response Text:", errorText)
      throw new Error(`API request failed with status ${response.status}`)
    }
  } catch (error) {
    console.error("Error in handleWhatIf:", error)
    throw error
  }
}

async function handleGraph(data) {
  const payload = {
    contract_address: data.contract_address,
    timestamp_data: {
      year: data.year,
      month: data.month,
      day: data.day,
      hour: data.hour,
      minute: data.minute,
    },
  }

  try {
    const response = await fetch(PREDICTED_PRICES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log("Status Code:", response.status)

    if (response.ok) {
      const responseData = await response.json()
      console.log("Response Data:", responseData)

      // Assertions
      if (!responseData.hasOwnProperty("predicted_prices_hours")) {
        throw new Error("Missing 'predicted_prices_hours' in response")
      }
      if (!responseData.hasOwnProperty("predicted_prices_days")) {
        throw new Error("Missing 'predicted_prices_days' in response")
      }
      if (!Array.isArray(responseData.predicted_prices_hours)) {
        throw new Error("'predicted_prices_hours' should be a list")
      }
      if (!Array.isArray(responseData.predicted_prices_days)) {
        throw new Error("'predicted_prices_days' should be a list")
      }

      console.log("Test Passed!")
      return responseData
    } else {
      console.log("Test Failed! Error:", await response.text())
      throw new Error(`API request failed with status ${response.status}`)
    }
  } catch (error) {
    console.error("Error in handleSample:", error)
    throw error
  }
}

export async function handleCombined(query, data) {
  try {
    console.log("Data is "+data.year);
    if (query == "1") {
      const whatIfResult = await handleWhatIf(data)
      const graphResult = await handleGraph(data)
      return {
        whatIf: whatIfResult,
        graph: graphResult,
      }
    }
    else if (query == '2')
    {
      const riskResult = await handleRisk(data)
      data.year = riskResult.best_day_to_buy.year;
      data.month = riskResult.best_day_to_buy.month;
      data.day = riskResult.best_day_to_buy.day;
      const graphResult = await handleGraph(data);
      return {
        risk: riskResult,
        graph: graphResult,
      }
    }
    else {
      const riskResult = await handleRisk(data)
      data.year = riskResult.best_day_to_sell.year;
      data.month = riskResult.best_day_to_sell.month;
      data.day = riskResult.best_day_to_sell.day;
      const graphResult = await handleGraph(data);
      return {
        risk: riskResult,
        graph: graphResult,
      }
    }


    
  } catch (error) {
    console.error("Error in handleCombined:", error)
    throw error
  }
}
