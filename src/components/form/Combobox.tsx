import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ComboboxProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  onSearch?: (query: string) => void;
  className?: string;
}

const Combobox = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  label,
  error,
  disabled,
  loading,
  onSearch,
  className = ''
}: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch?.(newQuery);
  };

  const handleOptionSelect = (option: Option) => {
    onChange(option.value);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className={`space-y-2 ${className}`} ref={comboboxRef}>
      {label && (
        <label className="block text-sm text-gray-400">{label}</label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? query : selectedOption?.label || ''}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full bg-black border rounded px-4 py-2.5
            focus:outline-none focus:border-[#00FF00] focus:ring-1 focus:ring-[#00FF00]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-[#333333]'}
          `}
        />
        <div className="absolute right-0 top-0 h-full px-3 flex items-center">
          {loading ? (
            <div className="animate-spin w-5 h-5 border-2 border-[#00FF00] border-t-transparent rounded-full" />
          ) : (
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>

        {isOpen && filteredOptions.length > 0 && (
          <div className="
            absolute z-50 w-full mt-1
            bg-[#111111] border border-[#333333] rounded-lg
            shadow-lg max-h-60 overflow-auto
          ">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={`
                  w-full px-4 py-2.5 text-left flex items-center
                  hover:bg-[#1A1A1A]
                  ${option.value === value ? 'text-[#00FF00]' : ''}
                `}
              >
                {option.icon && <span className="mr-2">{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Combobox; 