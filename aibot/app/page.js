import GeminiAI from './components/GeminiAI';

export default function Home() {
  return (
    <div className="flex flex-col h-screen" style={{ backgroundImage: 'url("/background/fantasy.jpg")', backgroundAttachment:'fixed' }}>
      <header className="sticky top-0 bg-teal-500 text-black p-4 text-center z-10">
        <h1>Gemini AI Integration</h1>
      </header>
      <main className="flex-grow flex justify-evenly">
        <div className="flex-1 bg-transparent">

        </div>

        <div className="flex-1 bg-transparent max-w-[calc(100%-994px)] w-full">
          <GeminiAI />
        </div>
3
        <div className="flex-1 bg-transparent">
          
        </div>
      </main>
    </div>
  );
}
