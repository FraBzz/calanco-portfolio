export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  wind: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
  forecast: ForecastDay[];
  advice: string;
}
