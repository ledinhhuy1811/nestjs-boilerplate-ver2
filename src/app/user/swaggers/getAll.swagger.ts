import { HttpStatus } from '@nestjs/common';

export default {
  bearerAuth: true,
  operations: {
    summary: 'Get all users (paginated)',
    description:
      'Returns a paginated list of users for admin only. Optional query: `page` (positive number, default 1) and `limit` (1–100, default 10). Requires a valid JWT from an admin account.',
  },
  responses: [
    {
      status: HttpStatus.OK,
      description: 'All users fetched successfully',
      content: {
        'application/json': {
          example: {
            message: 'All users fetched successfully',
            data: {
              page: 1,
              limit: 10,
              total: 25,
              data: [
                {
                  _id: '507f1f77bcf86cd799439011',
                  name: 'Jane Doe',
                  age: 28,
                  role: 'user',
                  email: 'jane@example.com',
                  password: '$2b$10$abcdefghijklmnopqrstuv',
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              ],
            },
            success: true,
            timestamp: new Date().toISOString(),
          },
        },
      },
    },
    {
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid query parameters (validation failed)',
      content: {
        'application/json': {
          example: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: ['limit must not be greater than 100'],
            error: 'Bad Request',
          },
        },
      },
    },
    {
      status: HttpStatus.FORBIDDEN,
      description: 'User does not have admin role',
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
