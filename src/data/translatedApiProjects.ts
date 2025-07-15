import { ApiProject } from '../types';
import { TFunction } from 'i18next';

export const createTranslatedApiProjects = (t: TFunction): ApiProject[] => [
  {
    id: 'product-management',
    title: t('projects.product_management.title'),
    description: t('projects.product_management.description'),
    stack: ['NestJS', 'TypeScript', 'Supabase', 'PostgreSQL', 'Class Validator', 'Swagger/OpenAPI', 'UUID', 'Jest'],
    features: t('projects.product_management.features', { returnObjects: true }) as string[],
    endpoints: [
      { method: 'POST', path: '/api/products' },
      { method: 'GET', path: '/api/products' },
      { method: 'GET', path: '/api/products/{id}' },
      { method: 'PUT', path: '/api/products/{id}' },
      { method: 'PATCH', path: '/api/products/{id}' },
      { method: 'DELETE', path: '/api/products/{id}' }
    ],    exampleResponse: {
      "type": "success",
      "status": 201,
      "message": t('responses.product_created'),
      "data": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Wireless Bluetooth Headphones",
        "description": "High-quality wireless headphones with noise cancellation",
        "price": 199.99,
        "category": "Electronics",
        "stock": 50,
        "sku": "WBH-001",
        "createdAt": "2025-06-07T10:30:00Z",
        "updatedAt": "2025-06-07T10:30:00Z"
      },
      "timestamp": "2025-06-07T10:30:00Z"
    }
  },
  {
    id: 'ecommerce',
    title: t('projects.ecommerce.title'),
    description: t('projects.ecommerce.description'),
    stack: ['NestJS', 'TypeScript', 'Supabase', 'PostgreSQL', 'UUID', 'Class Validator', 'Swagger/OpenAPI', 'Jest'],
    features: t('projects.ecommerce.features', { returnObjects: true }) as string[],
    endpoints: [
      { method: 'POST', path: '/api/cart/add' },
      { method: 'GET', path: '/api/cart/{id}' },
      { method: 'PUT', path: '/api/cart/{id}/update' },
      { method: 'DELETE', path: '/api/cart/{id}/remove' },
      { method: 'POST', path: '/api/orders/create' },
      { method: 'GET', path: '/api/orders/{id}' }
    ],    exampleResponse: {
      "type": "success",
      "status": 200,
      "message": t('responses.item_added_cart'),
      "data": {
        "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "lines": [
          {
            "productId": "123e4567-e89b-12d3-a456-426614174000",
            "quantity": 2
          }
        ]
      },
      "timestamp": "2025-06-07T10:30:00Z"
    }
  },
  {
    id: 'weather',
    title: t('projects.weather.title'),
    description: t('projects.weather.description'),
    stack: ['NestJS', 'TypeScript', 'Axios/HttpModule', 'WeatherAPI.com', 'Class Validator', 'Class Transformer', 'Swagger/OpenAPI', 'RxJS', 'Jest'],
    features: t('projects.weather.features', { returnObjects: true }) as string[],
    endpoints: [
      { method: 'GET', path: '/api/weather?city={cityName}&days={number}' }
    ],
    exampleResponse: {
      "type": "success",
      "data": {
        "location": "Roma",
        "temperature": 23.4,
        "humidity": 65,
        "wind": 12,
        "condition": "sunny",
        "forecast": [
          {
            "date": "2025-06-08",
            "maxTemp": 28,
            "minTemp": 17,
            "condition": "sunny"
          },
          {
            "date": "2025-06-09",
            "maxTemp": 25,
            "minTemp": 15,
            "condition": "cloudy"
          }
        ],        "advice": t('responses.perfect_day')
      },
      "status": 200,
      "message": t('responses.weather_retrieved'),
      "timestamp": "2025-06-07T10:30:00Z"
    }
  }
];
