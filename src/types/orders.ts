export interface CheckoutDto {
  cartId: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed' 
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'processing', 
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
] as const;

export const ORDER_STATUS_DESCRIPTIONS = {
  pending: 'Pending confirmation',
  confirmed: 'Order confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded'
} as const;

export interface OrderLineDto {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderResponseDto {
  id: string;
  cartId: string;
  totalAmount: number;
  status: OrderStatus;
  orderLines: OrderLineDto[];
  createdAt: string;
}

export interface Order {
  id: string;
  cartId?: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderLine {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  createdAt: Date;
}
