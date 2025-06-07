import { ApiProject } from '../types';

export const apiProjects: ApiProject[] = [
  // {
  //   id: 'auth',
  //   title: 'Authentication API',
  //   description: 'Secure, token-based user authentication with role-based access control.',
  //   stack: ['Node.js', 'Express', 'JSON Web Tokens', 'bcrypt', 'Redis'],
  //   features: [
  //     'JWT-based authentication',
  //     'Password hashing with bcrypt',
  //     'Email verification',
  //     'Role-based access control',
  //     'Token blacklisting with Redis'
  //   ],
  //   endpoints: [
  //     { method: 'POST', path: '/api/auth/register' },
  //     { method: 'POST', path: '/api/auth/login' },
  //     { method: 'GET', path: '/api/auth/verify/{token}' },
  //     { method: 'POST', path: '/api/auth/refresh-token' },
  //     { method: 'POST', path: '/api/auth/logout' }
  //   ],
  //   exampleResponse: {
  //     "status": "success",
  //     "data": {
  //       "user": {
  //         "id": "usr_123456789",
  //         "email": "user@example.com",
  //         "name": "John Doe",
  //         "roles": ["user"],
  //         "createdAt": "2023-03-15T09:12:33Z"
  //       },
  //       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  //       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  //     }
  //   }
  // },
  {
  id: 'product-management',
  title: 'Product Management API',
  description: 'Administrative REST API for comprehensive product lifecycle management with full CRUD operations, built with modern TypeScript architecture.',
  stack: ['NestJS', 'TypeScript', 'Supabase', 'PostgreSQL', 'Class Validator', 'Swagger/OpenAPI', 'UUID', 'Jest'],
  features: [
    'Create new products with validation',
    'Retrieve all products or by ID',
    'Update existing products (full/partial)',
    'Delete products with existence verification',
    'UUID-based product identification',
    'Input validation and sanitization',
    'Auto-generated API documentation',
    'Comprehensive error handling',
    'Database transaction safety',
    'Unit testing coverage'
  ],
  endpoints: [
    { method: 'GET', path: '/api/products' },
    { method: 'GET', path: '/api/products/{id}' },
    { method: 'POST', path: '/api/products' },
    { method: 'PUT', path: '/api/products/{id}' },
    { method: 'DELETE', path: '/api/products/{id}' }
  ],
  exampleResponse: {
    "type": "success",
    "data": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Premium Wireless Headphones",
      "description": "High-quality wireless headphones with active noise cancellation and 30-hour battery life",
      "price": 299.99,
      "created_at": "2025-06-07T10:30:00Z",
      "updated_at": "2025-06-07T10:30:00Z"
    },
    "status": 201,
    "message": "Product created successfully",
    "timestamp": "2025-06-07T10:30:00Z"
  }
},
  {
  id: 'ecommerce',
  title: 'E-commerce Shopping API',
  description: 'Complete shopping cart and order management system with smart cart initialization, comprehensive item management, and seamless checkout process.',
  stack: ['NestJS', 'TypeScript', 'Class Validator', 'Class Transformer', 'Swagger/OpenAPI', 'UUID', 'Dependency Injection', 'Jest'],
  features: [
    'Smart cart creation and management',
    'Add/remove items with quantity control',
    'Empty cart ID handling for new carts',
    'Complete checkout process',
    'Order tracking and retrieval',
    'UUID validation for all entities',
    'Interface-based service architecture',
    'Comprehensive error handling',
    'Structured API responses with timestamps',
    'Full test coverage with Jest'
  ],
  endpoints: [
    { method: 'GET', path: '/cart/:id' },
    { method: 'POST', path: '/cart/:id/items' },
    { method: 'DELETE', path: '/cart/:id/items/:productId' },
    { method: 'DELETE', path: '/cart/:id' },
    { method: 'POST', path: '/orders/checkout' },
    { method: 'GET', path: '/orders/:id' }
  ],
  exampleResponse: {
    "type": "success",
    "status": 200,
    "message": "Item added to cart successfully",
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
  title: 'Weather Forecast API',
  description: 'Real-time weather information service with current conditions and multi-day forecasts, integrating external weather data providers.',
  stack: ['NestJS', 'TypeScript', 'Axios/HttpModule', 'WeatherAPI.com', 'Class Validator', 'Class Transformer', 'Swagger/OpenAPI', 'RxJS', 'Jest'],
  features: [
    'Current weather conditions by city',
    'Multi-day weather forecasts (up to 7 days)',
    'Weather condition mapping and normalization',
    'Dynamic weather advice generation',
    'Temperature, humidity, and wind data',
    'Query parameter validation and transformation',
    'External API integration with error handling',
    'Comprehensive API documentation',
    'Provider pattern for external services',
    'Environment-based configuration',
    'Unit testing coverage'
  ],
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
      ],
      "advice": "Perfect day to be outside!"
    },
    "status": 200,
    "message": "Weather data retrieved successfully",
    "timestamp": "2025-06-07T10:30:00Z"
  }
}
  // {
  //   id: 'notification',
  //   title: 'Notification System',
  //   description: 'Multi-channel notification service for email, SMS, and push notifications.',
  //   stack: ['Node.js', 'Express', 'SendGrid', 'Twilio', 'Firebase Cloud Messaging', 'RabbitMQ'],
  //   features: [
  //     'Email notifications',
  //     'SMS messaging',
  //     'Push notifications',
  //     'Message templating',
  //     'Delivery status tracking',
  //     'Queue-based processing'
  //   ],
  //   endpoints: [
  //     { method: 'POST', path: '/api/notifications/email' },
  //     { method: 'POST', path: '/api/notifications/sms' },
  //     { method: 'POST', path: '/api/notifications/push' },
  //     { method: 'GET', path: '/api/notifications/{id}/status' },
  //     { method: 'GET', path: '/api/notifications/history' }
  //   ],
  //   exampleResponse: {
  //     "status": "success",
  //     "data": {
  //       "notification": {
  //         "id": "notif_123456789",
  //         "type": "email",
  //         "recipient": "user@example.com",
  //         "subject": "Your Order Confirmation",
  //         "content": "Thank you for your order! Your order #12345 has been confirmed.",
  //         "template": "order_confirmation",
  //         "templateData": {
  //           "orderNumber": "12345",
  //           "orderDate": "2023-06-10T09:30:15Z"
  //         },
  //         "status": "delivered",
  //         "deliveredAt": "2023-06-10T09:31:22Z",
  //         "createdAt": "2023-06-10T09:30:45Z"
  //       }      }
  //   }
  // },
  
  // {
  //   id: 'text-summarizer',
  //   title: 'Text Summarization API',
  //   description: 'Natural language processing API that generates concise summaries of text.',
  //   stack: ['Python', 'FastAPI', 'spaCy', 'NLTK', 'Hugging Face Transformers', 'Redis'],
  //   features: [
  //     'Extractive summarization',
  //     'Abstractive summarization',
  //     'Key phrase extraction',
  //     'Sentiment analysis',
  //     'Multiple language support',
  //     'Response caching'
  //   ],
  //   endpoints: [
  //     { method: 'POST', path: '/api/summarize/extractive' },
  //     { method: 'POST', path: '/api/summarize/abstractive' },
  //     { method: 'POST', path: '/api/extract/keyphrases' },
  //     { method: 'POST', path: '/api/analyze/sentiment' }
  //   ],
  //   exampleResponse: {
  //     "original": {
  //       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  //       "wordCount": 250,
  //       "charCount": 1430
  //     },
  //     "summary": {
  //       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel justo eu neque...",
  //       "wordCount": 64,
  //       "charCount": 380
  //     },
  //     "keyPhrases": [
  //       "Lorem ipsum dolor sit amet",
  //       "Ut vel justo eu neque commodo",
  //       "Praesent eget magna vel"
  //     ],
  //     "sentiment": "positive",
  //     "reductionPercentage": 75
  //   }
  // }
];