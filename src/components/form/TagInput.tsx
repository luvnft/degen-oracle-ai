import React from 'react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
}

const TagInput = ({ value, onChange, suggestions = [], placeholder = 'Add tags...' }: TagInputProps) => {
  const [input, setInput] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput('');
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => !value.includes(suggestion) && 
    suggestion.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="bg-black border border-[#333333] rounded px-3 py-2 flex flex-wrap gap-2 focus-within:border-[#88D693] focus-within:ring-1 focus-within:ring-[#88D693]">
        {value.map(tag => (
          <span
            key={tag}
            className="bg-[#1A1A1A] text-white px-2 py-1 rounded-lg text-sm flex items-center space-x-1"
          >
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="text-gray-400 hover:text-white ml-1"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="bg-transparent outline-none flex-1 min-w-[120px] text-white placeholder-gray-500"
          placeholder={value.length === 0 ? placeholder : ''}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-[#111111] border border-[#333333] rounded-lg shadow-lg">
          {filteredSuggestions.map(suggestion => (
            <button
              key={suggestion}
              onClick={() => {
                onChange([...value, suggestion]);
                setInput('');
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-[#1A1A1A] text-gray-300 hover:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput; 