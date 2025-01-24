"use client";
import React, { useState } from "react";
import { marked } from "marked";
import { Button } from "@/components/ui/button";


function ChatBot({address}) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input  }),
      });
      const data = await result.json();
      setResponse(data.text || "No response text available");
    } catch (error) {
      setResponse("Error fetching response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[80vh] p-4 bg-gray-100 bg-slate-50 rounded-lg ">
      {/* AI Response Card */}
      <div
        className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md text-black overflow-y-auto"
        style={{ maxHeight: "65vh" }} // Adjusted max height for the response card
      >
        {loading ? (
          <p className="text-center text-lg animate-pulse">Analyzing...</p>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: marked(response) }}
            className="whitespace-pre-wrap"
          />
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex items-center gap-2 bg-white p-4 mt-2 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-grow p-2  focus:outline-none focus:ring-2 focus:ring-purple-500-500"
          placeholder="Ask me :)"
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ChatBot;
