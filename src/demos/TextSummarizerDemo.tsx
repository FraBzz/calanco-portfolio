import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Info } from 'lucide-react';

const TextSummarizerDemo: React.FC = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || text.length < 100) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create a summarized version that's about 25% of the original
      const words = text.split(' ');
      const summaryLength = Math.max(Math.floor(words.length * 0.25), 10);
      const summarizedText = words.slice(0, summaryLength).join(' ') + '...';
      
      // Extract key phrases (simplified)
      const keyPhrases = [];
      const sentences = text.split(/[.!?]+/);
      
      for (let i = 0; i < Math.min(3, sentences.length); i++) {
        if (sentences[i].trim().length > 15) {
          keyPhrases.push(sentences[i].trim());
        }
      }
      
      setResult({
        original: {
          text,
          wordCount: words.length,
          charCount: text.length
        },
        summary: {
          text: summarizedText,
          wordCount: summaryLength,
          charCount: summarizedText.length
        },
        keyPhrases: keyPhrases,
        sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
        reductionPercentage: Math.round((1 - summaryLength / words.length) * 100)
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="text" className="block text-sm font-medium">
              Input Text (at least a few paragraphs)
            </label>
            <span className="text-xs px-2 py-0.5 bg-gray-700 rounded">
              {text.length} chars
            </span>
          </div>
          <textarea
            id="text"
            value={text}
            onChange={handleChange}
            rows={8}
            placeholder="Paste your long text here (minimum 100 characters)..."
            className="w-full p-3 bg-neutral-800 border border-separator-dark rounded-md"
            required
          ></textarea>
          
          {text.length > 0 && text.length < 100 && (
            <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Please enter more text for effective summarization (at least 100 characters).
            </p>
          )}
        </div>
          <button
          type="submit"
          disabled={isLoading || text.length < 100}
          className={`py-2.5 px-6 rounded-md font-medium transition-colors ${
            isLoading || text.length < 100
              ? 'bg-accent/20 text-accent/50 cursor-not-allowed' 
              : 'bg-accent hover:bg-accent/90 text-white'
          }`}
        >
          {isLoading ? 'Processing...' : 'Summarize Text'}
        </button>
      </form>
      
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-800 p-5 rounded-lg border border-separator-dark"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Summary Results
            </h4>
            <div className="text-xs px-3 py-1 bg-green-900/30 text-green-400 rounded-full">
              {result.reductionPercentage}% shorter
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <h5 className="text-sm font-medium">Summarized Text</h5>
              <button
                onClick={() => copyText(result.summary.text)}
                className="text-xs flex items-center gap-1 text-accent hover:underline"
              >
                <Copy className="h-3 w-3" /> Copy
              </button>
            </div>
            <div className="p-3 bg-background-dark rounded text-sm">
              {result.summary.text}
            </div>
            <div className="mt-1 text-xs text-gray-400">
              {result.summary.wordCount} words • {result.summary.charCount} characters
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <h5 className="text-sm font-medium mb-1">Key Phrases</h5>
              <ul className="space-y-2">
                {result.keyPhrases.map((phrase: string, index: number) => (
                  <li key={index} className="text-xs p-2 bg-background-dark rounded">
                    {phrase}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-1">Sentiment Analysis</h5>
              <div className={`inline-block px-3 py-1 rounded-full text-xs ${
                result.sentiment === 'positive' 
                  ? 'bg-green-900/30 text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              }`}>
                {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium mb-2">API Response</h5>
            <div className="bg-neutral-800/80 p-3 rounded-md overflow-x-auto">
              <pre className="text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        </motion.div>
      )}
      
      {!text && !result && (
        <div className="text-center py-10 text-gray-400">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Paste a long text to generate a summary and analysis.</p>
        </div>
      )}
    </div>
  );
};

export default TextSummarizerDemo;


