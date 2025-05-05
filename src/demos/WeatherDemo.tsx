import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Cloud, CloudRain, Sun, CloudFog, CloudLightning, Wind } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  wind: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
}

const WeatherDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a city name');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      const conditions: Array<'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy'> = ['sunny', 'cloudy', 'rainy', 'stormy', 'foggy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      setWeather({
        location: searchQuery,
        temperature: Math.floor(Math.random() * 30) + 5, // 5-35°C
        humidity: Math.floor(Math.random() * 70) + 30, // 30-100%
        wind: Math.floor(Math.random() * 20) + 1, // 1-20 km/h
        condition: randomCondition
      });
      
      setIsLoading(false);
    }, 1200);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-16 w-16 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-16 w-16 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-16 w-16 text-blue-500" />;
      case 'stormy':
        return <CloudLightning className="h-16 w-16 text-purple-500" />;
      case 'foggy':
        return <CloudFog className="h-16 w-16 text-gray-400" />;
      default:
        return <Cloud className="h-16 w-16 text-gray-500" />;
    }
  };

  const getConditionLabel = (condition: string) => {
    return condition.charAt(0).toUpperCase() + condition.slice(1);
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Enter city name (e.g., London, New York, Tokyo)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full p-3 bg-white dark:bg-gray-800 border border-separator-light dark:border-separator-dark rounded-md"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`absolute right-2 top-2 px-4 py-1 rounded text-sm font-medium ${
              isLoading 
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
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
      
      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-separator-light dark:border-separator-dark"
        >
          <div className="flex flex-col sm:flex-row items-center sm:justify-between">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h3 className="text-2xl font-bold mb-1">{weather.location}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Today's weather
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              {getWeatherIcon(weather.condition)}
              <span className="mt-1 font-medium">{getConditionLabel(weather.condition)}</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
              <div className="text-3xl font-display font-bold mb-1">
                {weather.temperature}°C
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Temperature</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
              <div className="text-3xl font-display font-bold mb-1">
                {weather.humidity}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Humidity</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
              <div className="text-3xl font-display font-bold mb-1 flex items-center justify-center">
                <Wind className="h-5 w-5 mr-1" />
                {weather.wind}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Wind (km/h)</div>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-900/80 rounded-md text-xs text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-1">API Request:</p>
            <code className="block">
              GET /api/weather?location={encodeURIComponent(weather.location)}
            </code>
            
            <p className="font-medium mt-3 mb-1">API Response:</p>
            <pre className="overflow-x-auto">
              {JSON.stringify(weather, null, 2)}
            </pre>
          </div>
        </motion.div>
      )}
      
      {!weather && !isLoading && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <Cloud className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Enter a city name to get the current weather conditions.</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDemo;