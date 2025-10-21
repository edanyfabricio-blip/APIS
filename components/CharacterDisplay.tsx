
import React from 'react';
import type { CharacterResult } from '../types';

interface CharacterDisplayProps {
  result: CharacterResult;
  onReset: () => void;
}

// A simple parser to format the description text
const FormattedDescription: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/\*\*(.*?):\*\*/).filter(part => part.trim() !== '');

  return (
    <div className="space-y-4 text-gray-700 dark:text-gray-300 text-left">
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          // This is a title
          return <h3 key={index} className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-4">{part}</h3>;
        } else {
          // This is the content
          return (
            <div key={index} className="whitespace-pre-wrap leading-relaxed">
              {part.trim().split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col items-center">
            <img 
                src={result.imageUrl} 
                alt="Generated Character" 
                className="w-full h-auto max-w-sm rounded-2xl shadow-lg object-cover border-4 border-white dark:border-gray-700"
            />
        </div>
        <div>
            <FormattedDescription text={result.description} />
        </div>
      </div>
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
        >
          Crear Otro Personaje
        </button>
      </div>
    </div>
  );
};
