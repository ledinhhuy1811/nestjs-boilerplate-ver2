import { IsNumber, IsOptional, Max, Min, IsPositive } from 'class-validator';

export class GetAllUsersDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
}
