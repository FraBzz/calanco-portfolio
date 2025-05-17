import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Cloud, CloudRain, Sun, CloudFog, CloudLightning, Wind } from 'lucide-react';

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
}

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  wind: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
  forecast: ForecastDay[];
  advice: string;
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

      // Generate forecast for next 3 days
      const daysOfWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ];
      const today = new Date();
      const forecast: ForecastDay[] = Array.from({ length: 3 }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i + 1);
        const day = daysOfWeek[date.getDay()];
        const high = Math.floor(Math.random() * 10) + 20; // 20-29°C
        const low = high - Math.floor(Math.random() * 7) - 2; // high-2 to high-8
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        return { day, high, low, condition };
      });

      // Simulate advice from API
      const advices = [
        'Always carry an umbrella!',
        'Don’t forget your sunscreen.',
        'Today is perfect for a walk.',
        'Watch out for strong winds!',
        'Ideal day to stay home and read.'
      ];
      const advice = advices[Math.floor(Math.random() * advices.length)];

      setWeather({
        location: searchQuery,
        temperature: Math.floor(Math.random() * 30) + 5, // 5-35°C
        humidity: Math.floor(Math.random() * 70) + 30, // 30-100%
        wind: Math.floor(Math.random() * 20) + 1, // 1-20 km/h
        condition: randomCondition,
        forecast,
        advice,
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

          {/* Forecast for next 3 days */}
          <div className="mt-8">
          <h4 className="font-semibold mb-3 text-lg">3-day forecast</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {weather.forecast.map((day, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-4 rounded flex flex-col items-center">
                  <span className="font-medium mb-1">{day.day}</span>
                  {getWeatherIcon(day.condition)}
                  <span className="mt-1 text-sm">{getConditionLabel(day.condition)}</span>
                  <div className="mt-2 text-base">
                    <span className="font-bold">{day.high}°C</span>
                    <span className="mx-1 text-gray-500">/</span>
                    <span className="text-gray-500">{day.low}°C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advice from API */}
          {weather.advice && (
          <div className="mt-6 text-center">
            <span className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-4 py-2 rounded font-medium">
              {weather.advice}
            </span>
          </div>)
          }

          {/* API Request/Response rimossi per una UI più compatta */}
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