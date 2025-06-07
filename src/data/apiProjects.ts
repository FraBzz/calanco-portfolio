import { ApiProject } from '../types';

export const apiProjects: ApiProject[] = [
  {
    id: 'auth',
    title: 'Authentication API',
    description: 'Secure, token-based user authentication with role-based access control.',
    stack: ['Node.js', 'Express', 'JSON Web Tokens', 'bcrypt', 'Redis'],
    features: [
      'JWT-based authentication',
      'Password hashing with bcrypt',
      'Email verification',
      'Role-based access control',
      'Token blacklisting with Redis'
    ],
    endpoints: [
      { method: 'POST', path: '/api/auth/register' },
      { method: 'POST', path: '/api/auth/login' },
      { method: 'GET', path: '/api/auth/verify/{token}' },
      { method: 'POST', path: '/api/auth/refresh-token' },
      { method: 'POST', path: '/api/auth/logout' }
    ],
    exampleResponse: {
      "status": "success",
      "data": {
        "user": {
          "id": "usr_123456789",
          "email": "user@example.com",
          "name": "John Doe",
          "roles": ["user"],
          "createdAt": "2023-03-15T09:12:33Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  },
  {
    id: 'ecommerce',
    title: 'E-commerce API',
    description: 'Comprehensive API for online stores with product, cart, and order management.',
    stack: ['NestJS', 'PostgreSQL', 'TypeORM', 'Stripe', 'Redis'],
    features: [
      'Product inventory management',
      'Shopping cart functionality',
      'Secure checkout process',
      'Order tracking and history',
      'Payment processing with Stripe',
      'Caching with Redis'
    ],
    endpoints: [
      { method: 'GET', path: '/api/products' },
      { method: 'GET', path: '/api/products/{id}' },
      { method: 'POST', path: '/api/cart/items' },
      { method: 'DELETE', path: '/api/cart/items/{id}' },
      { method: 'POST', path: '/api/checkout' },
      { method: 'GET', path: '/api/orders/{id}' }
    ],
    exampleResponse: {
      "status": "success",
      "data": {
        "order": {
          "id": "ord_987654321",
          "user_id": "usr_123456789",
          "items": [
            {
              "product_id": "prod_001",
              "name": "Premium Headphones",
              "price": 199.99,
              "quantity": 1
            },
            {
              "product_id": "prod_002",
              "name": "Smart Watch",
              "price": 249.99,
              "quantity": 1
            }
          ],
          "subtotal": 449.98,
          "tax": 36.00,
          "total": 485.98,
          "status": "paid",
          "createdAt": "2023-04-10T14:30:45Z"
        },
        "payment": {
          "id": "pay_abc123456",
          "provider": "stripe",
          "status": "completed"
        },
        "shipping": {
          "address": "123 Main St, City, Country",
          "method": "express",
          "tracking": "TRK12345678"
        }
      }
    }
  },
  {
    id: 'weather',
    title: 'Weather API Integration',      
    description: 'Reliable weather data API with WeatherAPI integration and Italian municipalities database support. Features real-time weather conditions and 3-day forecasts.',
    stack: ['Nest.js', 'TypeScript', 'WeatherAPI', 'React', 'Tailwind CSS', 'Framer Motion', 'Fuse.js'],
    features: [
      'Current weather data with temperature, humidity, and wind',
      '3-day weather forecast',
      'Smart city search with autocomplete',
      'Italian municipalities database',
      'Smart weather advice'
    ],endpoints: [
      { method: 'GET', path: '/weather?city={city},{country}&days={number}' }
    ],exampleResponse: {
      "type": "success",
      "data": {
        "location": "Milano",
        "temperature": 18,
        "humidity": 65,
        "wind": 12,
        "condition": "cloudy",
        "forecast": [
          { "date": "2025-05-24", "maxTemp": 20, "minTemp": 13, "condition": "sunny" },
          { "date": "2025-05-25", "maxTemp": 22, "minTemp": 14, "condition": "cloudy" },
          { "date": "2025-05-26", "maxTemp": 19, "minTemp": 12, "condition": "rainy" }
        ],
        "advice": "Ottimo momento per una passeggiata all'aperto"
      },
      "message": "Success",
      "status": 200,
      "timestamp": "2025-05-24T11:45:30Z"
    }
  },
  {
    id: 'notification',
    title: 'Notification System',
    description: 'Multi-channel notification service for email, SMS, and push notifications.',
    stack: ['Node.js', 'Express', 'SendGrid', 'Twilio', 'Firebase Cloud Messaging', 'RabbitMQ'],
    features: [
      'Email notifications',
      'SMS messaging',
      'Push notifications',
      'Message templating',
      'Delivery status tracking',
      'Queue-based processing'
    ],
    endpoints: [
      { method: 'POST', path: '/api/notifications/email' },
      { method: 'POST', path: '/api/notifications/sms' },
      { method: 'POST', path: '/api/notifications/push' },
      { method: 'GET', path: '/api/notifications/{id}/status' },
      { method: 'GET', path: '/api/notifications/history' }
    ],
    exampleResponse: {
      "status": "success",
      "data": {
        "notification": {
          "id": "notif_123456789",
          "type": "email",
          "recipient": "user@example.com",
          "subject": "Your Order Confirmation",
          "content": "Thank you for your order! Your order #12345 has been confirmed.",
          "template": "order_confirmation",
          "templateData": {
            "orderNumber": "12345",
            "orderDate": "2023-06-10T09:30:15Z"
          },
          "status": "delivered",
          "deliveredAt": "2023-06-10T09:31:22Z",
          "createdAt": "2023-06-10T09:30:45Z"
        }      }
    }
  },
  {
    id: 'product-management',
    title: 'Product Management API',
    description: 'Administrative API for product lifecycle management with full CRUD operations.',
    stack: ['NestJS', 'PostgreSQL', 'TypeORM', 'Class Validator', 'Swagger'],
    features: [
      'Create new products',
      'Update existing products',
      'Delete products',
      'Product inventory tracking',
      'Input validation and sanitization',
      'Auto-generated API documentation'
    ],
    endpoints: [
      { method: 'GET', path: '/api/products' },
      { method: 'POST', path: '/api/products' },
      { method: 'PUT', path: '/api/products/{id}' },
      { method: 'DELETE', path: '/api/products/{id}' },
      { method: 'GET', path: '/api/products/{id}' }
    ],
    exampleResponse: {
      "type": "success",
      "data": {
        "id": "prod_abc123",
        "name": "Premium Headphones",
        "description": "High-quality wireless headphones with noise cancellation",
        "price": 299.99,
        "createdAt": "2023-06-15T10:30:00Z",
        "updatedAt": "2023-06-15T10:30:00Z"
      },
      "status": 201,
      "message": "Product created successfully",
      "timestamp": "2023-06-15T10:30:00Z"
    }
  },
  {
    id: 'text-summarizer',
    title: 'Text Summarization API',
    description: 'Natural language processing API that generates concise summaries of text.',
    stack: ['Python', 'FastAPI', 'spaCy', 'NLTK', 'Hugging Face Transformers', 'Redis'],
    features: [
      'Extractive summarization',
      'Abstractive summarization',
      'Key phrase extraction',
      'Sentiment analysis',
      'Multiple language support',
      'Response caching'
    ],
    endpoints: [
      { method: 'POST', path: '/api/summarize/extractive' },
      { method: 'POST', path: '/api/summarize/abstractive' },
      { method: 'POST', path: '/api/extract/keyphrases' },
      { method: 'POST', path: '/api/analyze/sentiment' }
    ],
    exampleResponse: {
      "original": {
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "wordCount": 250,
        "charCount": 1430
      },
      "summary": {
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel justo eu neque...",
        "wordCount": 64,
        "charCount": 380
      },
      "keyPhrases": [
        "Lorem ipsum dolor sit amet",
        "Ut vel justo eu neque commodo",
        "Praesent eget magna vel"
      ],
      "sentiment": "positive",
      "reductionPercentage": 75
    }
  }
];