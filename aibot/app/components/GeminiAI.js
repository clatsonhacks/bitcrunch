'use client';

import { useState } from 'react';
import { marked } from 'marked';

const GeminiAI = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await result.json();
      console.log(data);

      setResponse(data.text || 'No response text available');
    } catch (error) {
      setResponse('Error fetching response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col w-auto bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("/background/fantasy.jpg")' }}>
      <div className="flex-grow bg-black bg-opacity-60 text-white p-4 rounded-md overflow-y-auto mb-4" style={{ maxHeight: 'calc(100vh - 130px)' }}>
        {loading ? (
          <p className="text-center text-xl animate-blink">Analyzing...</p>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: marked(response) }}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        )}
      </div>

      {/* Centered Chat Box at Bottom */}
      <div className="fixed bottom-0 left-1/2 right-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-994px)] p-4 bg-gray-800 text-white shadow-lg">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 text-black border rounded-md"
            placeholder="Enter your prompt..."
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeminiAI;