import { Cloud, CloudRain, Sun, CloudFog, CloudLightning, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import type { WeatherData } from '../../types/weather';

interface CurrentWeatherProps {
  weather: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
    </motion.div>
  );
};
