
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-500">
            <SparklesIcon className="w-8 h-8"/>
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
        La magia está en marcha... creando tu personaje.
      </p>
    </div>
  );
};
