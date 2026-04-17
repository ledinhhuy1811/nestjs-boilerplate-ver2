import { HttpStatus } from '@nestjs/common';

export default {
  bearerAuth: true,
  operations: {
    summary: 'Get current user',
    description:
      'Fetches the authenticated user profile by using the user id extracted from a valid JWT token.',
  },
  responses: [
    {
      status: HttpStatus.OK,
      description: 'User fetched successfully',
      content: {
        'application/json': {
          example: {
            message: 'User fetched successfully',
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
      status: HttpStatus.UNAUTHORIZED,
      description: 'Missing or invalid token',
      content: {
        'application/json': {
          example: {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Missing token',
            error: 'Unauthorized',
          },
        },
      },
    },
    {
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
      content: {
        'application/json': {
          example: {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
            error: 'Not Found',
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
