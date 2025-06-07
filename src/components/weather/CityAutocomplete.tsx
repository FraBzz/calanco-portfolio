import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { fuse, type Comune } from '../../data/comuni';

interface CityAutocompleteProps {
  onCitySelect: (city: Comune) => void;
  isLoading: boolean;
  error: string | null;
}

export const CityAutocomplete: React.FC<CityAutocompleteProps> = ({ onCitySelect, isLoading, error }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Comune[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCity, setSelectedCity] = useState<Comune | null>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedCity(null);

    if (query.length > 1) {
      const results = fuse.search(query);
      setSuggestions(results.slice(0, 6).map(result => result.item));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (city: Comune) => {
    setSearchQuery(city.name);
    setSelectedCity(city);
    setShowSuggestions(false);
    onCitySelect(city);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (selectedCity) {
        onCitySelect(selectedCity);
      }
    }} className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Enter city name (e.g., Milano, Roma, Napoli)"
          value={searchQuery}
          onChange={handleInputChange}
          className="pl-10 w-full p-3 bg-white dark:bg-background-dark border border-separator-light dark:border-separator-dark rounded-md"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionRef}
            className="absolute z-10 w-full mt-1 bg-white dark:bg-background-dark border border-separator-light dark:border-separator-dark rounded-md shadow-lg"
          >
            {suggestions.map((city) => (
              <button
                key={city.name}
                type="button"
                onClick={() => handleSelectCity(city)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md"
              >
                {city.name}, {city.country_code}
              </button>
            ))}
          </div>
        )}        <button
          type="submit"
          disabled={isLoading || !selectedCity}
          className={`absolute right-2 top-2 px-4 py-1 rounded text-sm font-medium ${
            isLoading || !selectedCity
              ? 'bg-accent/20 text-accent/50 cursor-not-allowed' 
              : 'bg-accent hover:bg-accent/90 text-white'
          }`}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </form>
  );
};
