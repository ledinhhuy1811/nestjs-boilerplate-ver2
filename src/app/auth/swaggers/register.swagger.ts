import { HttpStatus } from '@nestjs/common';

export default {
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
