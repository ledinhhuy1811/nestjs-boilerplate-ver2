import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { COSMOS_CLIENT } from '../../services/cosmos/contants';
import { UserRepository } from './user.repository';
import { GetAllUsersDto } from './dtos/getAll.dto';

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

  async getAllUsers(query: GetAllUsersDto) {
    const { page = 1, limit = 10 } = query;
    const users = await this.userRepository.findAll(page, limit);
    const totalUsers = await this.userRepository.countAllUsers();

    return { page, limit, total: totalUsers, data: users };
  }

  async getOraichainBalance(address: string) {
    const balance = await this.cosmosClient.getBalance(address, 'orai');

    return { balance };
  }
}
