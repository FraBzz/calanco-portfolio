export { WeatherService } from './weatherService';
export { ProductsService } from './productsService';
export { CartService } from './cartService';
export { OrdersService } from './ordersService';
export { ContactService } from './contactService';
export type { Product, CreateProductDto, UpdateProductDto } from './productsService';
export type { CartDto, CartLine, AddItemDto } from './cartService';
export type { ContactFormData, ContactResponse, ValidationError } from './contactService';
export type { 
  CheckoutDto, 
  OrderResponseDto, 
  OrderLineDto, 
  Order, 
  OrderLine, 
  OrderStatus 
} from '../types/orders';
export { ORDER_STATUSES, ORDER_STATUS_DESCRIPTIONS } from '../types/orders';
