import type { ApiResponseDto } from '../types/api';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
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

  /**
   * Creates a new product
   * @param productData - The product data to create
   * @returns Promise<Product>
   * @throws Error if the request fails
   */
  static async createProduct(productData: CreateProductDto): Promise<Product> {
    const url = `${this.BASE_URL}/products`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Invalid product data provided');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponseDto<Product> = await response.json();
      
      if (apiResponse.type === 'error' || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Failed to create product');
      }
      
      return apiResponse.data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to products service');
      }
      
      throw error;
    }
  }

  /**
   * Updates an existing product
   * @param productId - The ID of the product to update
   * @param productData - The product data to update
   * @returns Promise<Product>
   * @throws Error if the request fails
   */
  static async updateProduct(productId: string, productData: UpdateProductDto): Promise<Product> {
    const url = `${this.BASE_URL}/products/${productId}`;
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found');
        }
        if (response.status === 400) {
          throw new Error('Invalid product data provided');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponseDto<Product> = await response.json();
      
      if (apiResponse.type === 'error' || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Failed to update product');
      }
      
      return apiResponse.data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to products service');
      }
      
      throw error;
    }
  }

  /**
   * Deletes a product
   * @param productId - The ID of the product to delete
   * @returns Promise<void>
   * @throws Error if the request fails
   */
  static async deleteProduct(productId: string): Promise<void> {
    const url = `${this.BASE_URL}/products/${productId}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Some APIs return 204 No Content for successful deletes
      if (response.status === 204) {
        return;
      }
      
      const apiResponse: ApiResponseDto<null> = await response.json();
      
      if (apiResponse.type === 'error') {
        throw new Error(apiResponse.message || 'Failed to delete product');
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to products service');
      }
      
      throw error;
    }
  }
}
