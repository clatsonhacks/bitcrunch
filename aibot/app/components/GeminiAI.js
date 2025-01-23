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
    </div>
  );
};

export default GeminiAI;