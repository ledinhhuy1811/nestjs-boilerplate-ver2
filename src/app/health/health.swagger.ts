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
  },
};
