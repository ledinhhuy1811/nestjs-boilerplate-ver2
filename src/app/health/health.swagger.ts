import { HttpStatus } from '@nestjs/common';

export const checkHealthSwagger = {
  operations: {
    summary: 'Check health of the server',
    description:
      'Check health of the server by returning the status of the server',
  },
  responses: {
    [HttpStatus.OK]: {
      status: HttpStatus.OK,
      description: 'Server is running',
      content: {
        'application/json': {
          example: {
            message: 'Server is running',
            data: {
              status: HttpStatus.OK,
            },
            success: true,
            timestamp: new Date().toISOString(),
          },
        },
      },
    },
    [HttpStatus.INTERNAL_SERVER_ERROR]: {
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
  },
};
