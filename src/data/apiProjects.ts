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
    description: 'Reliable weather data API with caching and geolocation support.',
    stack: ['Node.js', 'Express', 'Axios', 'Redis', 'OpenWeatherMap'],
    features: [
      'Current weather conditions',
      'Weekly forecasts',
      'Geolocation support',
      'Response caching',
      'Rate limiting',
      'Weather alerts'
    ],
    endpoints: [
      { method: 'GET', path: '/api/weather/current?location={city}' },
      { method: 'GET', path: '/api/weather/forecast?location={city}&days={number}' },
      { method: 'GET', path: '/api/weather/alerts?location={city}' },
      { method: 'GET', path: '/api/weather/historical?location={city}&date={date}' }
    ],
    exampleResponse: {
      "location": "London",
      "temperature": 18,
      "humidity": 65,
      "wind": 12,
      "condition": "cloudy",
      "forecast": [
        { "day": "Monday", "high": 20, "low": 13, "condition": "partly_cloudy" },
        { "day": "Tuesday", "high": 22, "low": 14, "condition": "sunny" },
        { "day": "Wednesday", "high": 19, "low": 12, "condition": "rainy" }
      ],
      "lastUpdated": "2023-05-20T11:45:30Z"
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
        }
      }
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