import type { WeatherData } from '../types/weather';
import type { ApiResponseDto } from '../types/api';
import type { Comune } from '../data/comuni';

export class WeatherService {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL;

  /**
   * Fetches weather data for a given city
   * @param city - The city object containing name and country code
   * @param days - Number of days for forecast (default: 4)
   * @returns Promise<WeatherData>
   * @throws Error if the request fails or returns invalid data
   */
  static async getWeatherData(city: Comune, days: number = 4): Promise<WeatherData> {
    const url = `${this.BASE_URL}/weather?city=${encodeURIComponent(city.name)},${city.country_code}&days=${days}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponseDto<WeatherData> = await response.json();
      
      if (apiResponse.type === 'error' || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Failed to fetch weather data');
      }
      
      return apiResponse.data;
    } catch (error) {
      // Re-throw with more context if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to weather service');
      }
      
      // Re-throw the original error for other cases
      throw error;
    }
  }
}
