import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Inject, Injectable } from '@nestjs/common';

import { COSMOS_CLIENT } from '../../services/cosmos/contants';

@Injectable()
export class UserService {
  constructor(
    @Inject(COSMOS_CLIENT) private readonly cosmosClient: CosmWasmClient,
  ) {}

  async getOraichainBalance(address: string) {
    const balance = await this.cosmosClient.getBalance(address, 'orai');

    return { balance };
  }
}
