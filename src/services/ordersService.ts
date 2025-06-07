import type { CheckoutDto, OrderResponseDto } from '../types/orders';
import type { ApiResponseDto } from '../types/api';

export class OrdersService {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  /**
   * Processes checkout for a cart and creates an order
   * @param checkoutData - The checkout information
   * @returns Promise<OrderResponseDto>
   * @throws Error if the request fails
   */
  static async checkout(checkoutData: CheckoutDto): Promise<OrderResponseDto> {
    const url = `${this.BASE_URL}/orders/checkout`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Cart is empty or invalid');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponseDto<OrderResponseDto> = await response.json();
      
      if (apiResponse.type === 'error' || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Failed to process checkout');
      }
      
      return apiResponse.data;
    } catch (error) {
      // Re-throw with more context if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to orders service');
      }
      
      // Re-throw the original error for other cases
      throw error;
    }
  }

  /**
   * Gets an order by ID
   * @param orderId - The order ID
   * @returns Promise<OrderResponseDto>
   * @throws Error if the request fails
   */
  static async getOrder(orderId: string): Promise<OrderResponseDto> {
    const url = `${this.BASE_URL}/orders/${orderId}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Order not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponseDto<OrderResponseDto> = await response.json();
      
      if (apiResponse.type === 'error' || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Failed to fetch order');
      }
      
      return apiResponse.data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to orders service');
      }
      
      throw error;
    }
  }
}
