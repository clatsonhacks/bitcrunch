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
      <>
      </>
  );
};

export default GeminiAI;