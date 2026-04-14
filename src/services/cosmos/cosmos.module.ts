import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import { cosmosClientProvider } from './cosmos.provider';
import { COSMOS_CLIENT } from './contants';

@Global()
@Module({
  imports: [],
  providers: [cosmosClientProvider],
  exports: [cosmosClientProvider],
})
export class CosmosModule implements OnModuleDestroy {
  constructor(
    @Inject(COSMOS_CLIENT) private readonly cosmosClient: CosmWasmClient,
  ) {}

  onModuleDestroy() {
    this.cosmosClient.disconnect();
  }
}
