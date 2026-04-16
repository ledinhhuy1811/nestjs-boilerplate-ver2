import { HttpStatus } from '@nestjs/common';

export const registerUserSwagger = {
  operations: {
    summary: 'Register a new user',
    description:
      'Creates a user with a bcrypt-hashed password. Returns 400 if the email is already in use, or if the request body fails validation.',
  },
  body: {
    description: 'User registration payload',
    schema: {
      type: 'object',
      required: ['name', 'age', 'email', 'password'],
      properties: {
        name: { type: 'string', example: 'Jane Doe' },
        age: { type: 'number', example: 28 },
        email: { type: 'string', format: 'email', example: 'jane@example.com' },
        password: {
          type: 'string',
          format: 'password',
          example: 'Str0ngP@ssw0rd',
        },
      },
    },
  },
  responses: [
    {
      status: HttpStatus.OK,
      description: 'User registered successfully',
      content: {
        'application/json': {
          example: {
            message: 'User registered successfully',
            data: {
              user: {
                _id: '507f1f77bcf86cd799439011',
                name: 'Jane Doe',
                age: 28,
                role: 'user',
                email: 'jane@example.com',
                password: '$2b$10$abcdefghijklmnopqrstuv',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            },
            success: true,
            timestamp: new Date().toISOString(),
          },
        },
      },
    },
    {
      status: HttpStatus.BAD_REQUEST,
      description: 'Email already registered or request validation failed',
      content: {
        'application/json': {
          example: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Email already exists',
            error: 'Bad Request',
          },
        },
      },
    },
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
      content: {
        'application/json': {
          example: {
            message: 'Internal server error',
            data: {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
            },
            success: false,
            timestamp: new Date().toISOString(),
          },
        },
      },
    },
  ],
};

export const registerAdminSwagger = {
  operations: {
    summary: 'Register a new admin',
    description:
      'Creates an admin account with a bcrypt-hashed password. This endpoint is protected by API key authentication.',
  },
  apiKey: 'api-key',
  body: {
    description: 'Admin registration payload',
    schema: {
      type: 'object',
      required: ['name', 'age', 'email', 'password'],
      properties: {
        name: { type: 'string', example: 'System Admin' },
        age: { type: 'number', example: 30 },
        email: {
          type: 'string',
          format: 'email',
          example: 'admin@example.com',
        },
        password: {
          type: 'string',
          format: 'password',
          example: 'Str0ngP@ssw0rd',
        },
      },
    },
  },
  responses: [
    {
      status: HttpStatus.OK,
      description: 'Admin registered successfully',
      content: {
        'application/json': {
          example: {
            message: 'Admin registered successfully',
            data: {
              admin: {
                _id: '507f1f77bcf86cd799439012',
                name: 'System Admin',
                age: 30,
                role: 'user',
                email: 'admin@example.com',
                password: '$2b$10$abcdefghijklmnopqrstuv',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            },
            success: true,
            timestamp: new Date().toISOString(),
          },
        },
      },
    },
    {
      status: HttpStatus.FORBIDDEN,
      description: 'Missing API key',
      content: {
        'application/json': {
          example: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'Forbidden resource',
            error: 'Forbidden',
          },
        },
      },
    },
    {
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid API key',
      content: {
        'application/json': {
          example: {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Invalid API key',
            error: 'Unauthorized',
          },
        },
      },
    },
    {
      status: HttpStatus.BAD_REQUEST,
      description: 'Email already registered or request validation failed',
      content: {
        'application/json': {
          example: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Email already exists',
            error: 'Bad Request',
          },
        },
      },
    },
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
      content: {
        'application/json': {
          example: {
            message: 'Internal server error',
            data: {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
            },
            success: false,
            timestamp: new Date().toISOString(),
          },
        },
      },
    },
  ],
};
