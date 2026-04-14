import { ConfigService } from '@nestjs/config';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import { COSMOS_CLIENT } from './contants';

export const cosmosClientProvider = {
  provide: COSMOS_CLIENT,
  useFactory: async (configService: ConfigService) => {
    const oraiRpcUrl = configService.get('rpc.orai');
    const client = await CosmWasmClient.connect(oraiRpcUrl);

    return client;
  },
  inject: [ConfigService],
};
