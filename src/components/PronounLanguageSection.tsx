import React from 'react';

interface PronounOption {
  id: string;
  label: string;
}

interface PronounLanguageSectionProps {
  language: string;
  selectedPronouns: string[];
  pronounOptions: PronounOption[];
  onToggle: (pronoun: string) => void;
  isEditable: boolean;
}

const PronounLanguageSection: React.FC<PronounLanguageSectionProps> = ({
  language,
  selectedPronouns,
  pronounOptions,
  onToggle,
  isEditable
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">{language}</h2>
      <div className="flex flex-wrap gap-2">
        {pronounOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => isEditable && onToggle(option.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedPronouns.includes(option.id)
                ? 'bg-pink-600 text-white'
                : isEditable 
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-gray-100 text-gray-500'
            }`}
            disabled={!isEditable}
          >
            {option.label}
          </button>
        ))}
        
        {selectedPronouns.length === 0 && (
          <p className="text-gray-500 italic text-sm mt-1">
            {isEditable ? 'Click to select your pronouns' : 'No pronouns selected'}
          </p>
        )}
      </div>
    </div>
  );
};

export default PronounLanguageSection;