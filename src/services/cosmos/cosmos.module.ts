import { Global, Module } from '@nestjs/common';

import { cosmosClientProvider } from './cosmos.provider';

@Global()
@Module({
  imports: [],
  providers: [cosmosClientProvider],
  exports: [cosmosClientProvider],
})
export class CosmosModule {}
