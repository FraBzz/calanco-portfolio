import React from 'react';
import { Cloud, CloudRain, Sun, CloudFog, CloudLightning } from 'lucide-react';
import type { ForecastDay } from '../../types/weather';

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
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
    <div className="mt-8">
      <h4 className="font-semibold mb-3 text-lg">{forecast.length}-day forecast</h4>
      <div className="flex flex-wrap justify-center gap-4 sm:justify-center">
        {forecast.map((day, idx) => {
          const dateObj = new Date(day.date);
          const dateLabel = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
          return (
            <div key={idx} className="bg-neutral-800 dark:bg-neutral-800 p-4 rounded flex flex-col items-center w-full sm:w-auto sm:min-w-[200px] sm:flex-1 sm:max-w-[250px]">
              <span className="font-medium mb-1">{dateLabel}</span>
              {getWeatherIcon(day.condition)}
              <span className="mt-1 text-sm">{getConditionLabel(day.condition)}</span>
              <div className="mt-2 text-base">
                <span className="font-bold">{day.maxTemp}°C</span>
                <span className="mx-1 text-gray-500">/</span>
                <span className="text-gray-500">{day.minTemp}°C</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



