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
  pending: 'In attesa di conferma',
  confirmed: 'Ordine confermato',
  processing: 'In elaborazione',
  shipped: 'Spedito',
  delivered: 'Consegnato',
  cancelled: 'Annullato',
  refunded: 'Rimborsato'
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
