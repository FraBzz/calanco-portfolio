import type { ApiResponseDto } from '../types/api';

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface AddItemDto {
  productId: string;
  quantity: number;
}

export interface CartDto {
  id: string;
  lines: CartLine[];
}

export class CartService {
  private static readonly BASE_URL = 'http://localhost:3000';
  private static readonly EMPTY_CART_ID = '00000000-0000-0000-0000-000000000000';

  /**
   * Adds an item to the cart. If cartId is null, creates a new cart.
   * @param cartId - The cart ID, or null to create a new cart
   * @param item - The item to add to the cart
   * @returns Promise<{ cartId: string, cart: CartDto }>
   * @throws Error if the request fails
   */
  static async addToCart(cartId: string | null, item: AddItemDto): Promise<{ cartId: string, cart: CartDto }> {
    const actualCartId = cartId || this.EMPTY_CART_ID;
    const url = `${this.BASE_URL}/cart/${actualCartId}/items`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponseDto<CartDto> = await response.json();
      
      if (apiResponse.type === 'error' || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Failed to add item to cart');
      }
      
      return {
        cartId: apiResponse.data.id,
        cart: apiResponse.data
      };
    } catch (error) {
      // Re-throw with more context if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to cart service');
      }
      
      // Re-throw the original error for other cases
      throw error;
    }
  }

  /**
   * Gets the current cart
   * @param cartId - The cart ID
   * @returns Promise<CartDto>
   * @throws Error if the request fails
   */
  static async getCart(cartId: string): Promise<CartDto> {
    const url = `${this.BASE_URL}/cart/${cartId}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponseDto<CartDto> = await response.json();
      
      if (apiResponse.type === 'error' || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Failed to get cart');
      }
      
      return apiResponse.data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to cart service');
      }
      
      throw error;
    }
  }

  /**
   * Removes an item from the cart
   * @param cartId - The cart ID
   * @param productId - The product ID to remove
   * @returns Promise<CartDto>
   * @throws Error if the request fails
   */
  static async removeFromCart(cartId: string, productId: string): Promise<CartDto> {
    const url = `${this.BASE_URL}/cart/${cartId}/items/${productId}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponseDto<CartDto> = await response.json();
      
      if (apiResponse.type === 'error' || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Failed to remove item from cart');
      }
      
      return apiResponse.data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to cart service');
      }
      
      throw error;
    }
  }
}
