import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';
import type { WeatherData } from '../types/weather';
import type { Comune } from '../data/comuni';
import { CityAutocomplete } from '../components/weather/CityAutocomplete';
import { CurrentWeather } from '../components/weather/CurrentWeather';
import { WeatherForecast } from '../components/weather/WeatherForecast';
import { WeatherService } from '../services';

const WeatherDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleCitySelect = async (city: Comune) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const weatherData = await WeatherService.getWeatherData(city, 4);
      setWeather(weatherData);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <CityAutocomplete onCitySelect={handleCitySelect} isLoading={isLoading} error={error} />

      {isLoading && (
        <div className="flex flex-col items-center py-10 text-gray-400">
          <svg className="animate-spin h-8 w-8 mb-4 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <p>Loading weather data...</p>
        </div>
      )}

      {!isLoading && weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-background-dark p-6 rounded-lg border border-separator-dark"
        >
          <CurrentWeather weather={weather} />
          <WeatherForecast forecast={weather.forecast} />

          {weather.advice && (
            <div className="mt-6 text-center">
              <span className="inline-block bg-blue-900/40 text-blue-200 px-4 py-2 rounded font-medium">
                {weather.advice}
              </span>
            </div>
          )}
        </motion.div>
      )}

      {!isLoading && !weather && (
        <div className="text-center py-10 text-gray-400">
          <Cloud className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Enter a city name to get the current weather conditions.</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDemo;


