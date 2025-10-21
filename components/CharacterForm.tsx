
import React, { useState } from 'react';
import type { FormState } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface CharacterFormProps {
  onGenerate: (formState: FormState) => void;
  isLoading: boolean;
}

const characterTypes = [
  { id: 'animal', label: 'Animal' },
  { id: 'insecto', label: 'Insecto' },
  { id: 'criatura-ficticia', label: 'Criatura Ficticia' },
];

const artStyles = [
    { id: 'cartoon', label: 'Dibujo Animado (Cartoon)' },
    { id: '3d-render', label: 'Render 3D' },
    { id: 'anime', label: 'Anime' },
    { id: 'watercolor', label: 'Acuarela Digital' },
];

export const CharacterForm: React.FC<CharacterFormProps> = ({ onGenerate, isLoading }) => {
  const [formState, setFormState] = useState<FormState>({
    characterType: 'animal',
    keyTraits: 'solidaridad, el espíritu de activismo, el amor, el servicio y la ayuda a los demás',
    artStyle: 'cartoon',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">1. Elige un tipo de personaje</label>
        <div className="flex flex-wrap gap-3">
          {characterTypes.map(({ id, label }) => (
            <label key={id} className={`cursor-pointer px-4 py-2 rounded-lg border-2 transition-all duration-200 ${formState.characterType === id ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
              <input
                type="radio"
                name="characterType"
                value={id}
                checked={formState.characterType === id}
                onChange={handleChange}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="keyTraits" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">2. Describe sus valores</label>
        <textarea
          id="keyTraits"
          name="keyTraits"
          value={formState.keyTraits}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="Ej: amistad, coraje, protección de la naturaleza..."
        />
      </div>

      <div>
        <label htmlFor="artStyle" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">3. Selecciona un estilo artístico</label>
        <select
          id="artStyle"
          name="artStyle"
          value={formState.artStyle}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
          {artStyles.map(({ id, label }) => (
            <option key={id} value={id}>{label}</option>
          ))}
        </select>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <SparklesIcon />
          {isLoading ? 'Creando personaje...' : 'Generar Personaje'}
        </button>
      </div>
    </form>
  );
};
