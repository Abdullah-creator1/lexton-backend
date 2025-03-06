import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateTruckerDto } from './create-trucker.dto';

export class UpdateTruckerDto extends CreateTruckerDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}