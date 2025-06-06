import type { ApiResponseDto } from '../types/api';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export class ProductsService {
  private static readonly BASE_URL = 'http://localhost:3000';

  /**
   * Fetches all products from the API
   * @returns Promise<Product[]>
   * @throws Error if the request fails or returns invalid data
   */
  static async getAllProducts(): Promise<Product[]> {
    const url = `${this.BASE_URL}/products`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponseDto<Product[]> = await response.json();
      
      if (apiResponse.type === 'error' || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Failed to fetch products');
      }
      
      return apiResponse.data;
    } catch (error) {
      // Re-throw with more context if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to products service');
      }
      
      // Re-throw the original error for other cases
      throw error;
    }
  }
}
