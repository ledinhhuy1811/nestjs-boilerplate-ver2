import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { COSMOS_CLIENT } from '../../services/cosmos/contants';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(COSMOS_CLIENT) private readonly cosmosClient: CosmWasmClient,
    private readonly userRepository: UserRepository,
  ) {}

  async getUser(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user };
  }

  async getOraichainBalance(address: string) {
    const balance = await this.cosmosClient.getBalance(address, 'orai');

    return { balance };
  }
}
