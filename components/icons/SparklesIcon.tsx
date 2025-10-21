
import React from 'react';

export const SparklesIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.19c0-.861.366-1.666.969-2.226z"
      clipRule="evenodd"
    />
    <path d="M1.03 7.8A.75.75 0 011.75 7.5h3.375a.75.75 0 010 1.5H1.75a.75.75 0 01-.72-.7zM1.03 14.85a.75.75 0 01.72-.7h3.375a.75.75 0 010 1.5H1.75a.75.75 0 01-.72-.8zM5.53 3.45a.75.75 0 01.72-.7h3.375a.75.75 0 010 1.5H6.25a.75.75 0 01-.72-.8z" />
  </svg>
);
