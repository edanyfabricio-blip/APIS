
import React, { useState } from 'react';
import { CharacterForm } from './components/CharacterForm';
import { CharacterDisplay } from './components/CharacterDisplay';
import { Loader } from './components/Loader';
import type { CharacterResult, FormState } from './types';
import { generateCharacter } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [characterResult, setCharacterResult] = useState<CharacterResult | null>(null);

  const handleGenerate = async (formState: FormState) => {
    setIsLoading(true);
    setError(null);
    setCharacterResult(null);
    try {
      const result = await generateCharacter(formState);
      setCharacterResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCharacterResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 dark:text-gray-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Creador de Personajes Solidarios
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Usa IA para dar vida a un personaje que encarne el amor, el activismo y la ayuda.
          </p>
        </header>

        <main className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-500">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 font-semibold">{error}</p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Intentar de Nuevo
              </button>
            </div>
          ) : characterResult ? (
            <CharacterDisplay result={characterResult} onReset={handleReset} />
          ) : (
            <CharacterForm onGenerate={handleGenerate} isLoading={isLoading} />
          )}
        </main>
        
        <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Potenciado por la API de Gemini de Google.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
