import { HttpStatus } from '@nestjs/common';

export default {
  operations: {
    summary: 'Get Oraichain balance for an address',
    description:
      'Fetches the native ORAI coin balance for a wallet address on Oraichain using the configured Cosmos client.',
  },
  params: {
    name: 'address',
    description: 'The address to get the Oraichain balance for',
    example: 'orai1lrkhggqe7u2j3z3zdypv6m8v9zhjmng85gu4y9',
  },
  responses: {
    [HttpStatus.OK]: {
      status: HttpStatus.OK,
      description: 'Oraichain balance fetched successfully',
      content: {
        'application/json': {
          example: {
            message: 'Oraichain balance fetched successfully',
            data: {
              balance: {
                denom: 'orai',
                amount: '1000000',
              },
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
