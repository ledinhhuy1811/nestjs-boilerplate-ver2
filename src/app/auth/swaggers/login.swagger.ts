import { HttpStatus } from '@nestjs/common';

export const loginUserSwagger = {
  operations: {
    summary: 'Login user',
    description:
      'Authenticates a user by email and password, then returns JWT access and refresh tokens.',
  },
  body: {
    description: 'User login payload',
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
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
      description: 'User logged in successfully',
      content: {
        'application/json': {
          example: {
            message: 'User logged in successfully',
            data: {
              accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access.signature',
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh.signature',
            },
            success: true,
            timestamp: new Date().toISOString(),
          },
        },
      },
    },
    {
      status: HttpStatus.BAD_REQUEST,
      description: 'Wrong password or request validation failed',
      content: {
        'application/json': {
          example: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Wrong password',
            error: 'Bad Request',
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
