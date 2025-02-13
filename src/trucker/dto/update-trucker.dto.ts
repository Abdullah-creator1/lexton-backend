import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateTruckerDto } from './create-trucker.dto';

export class UpdateTruckerDto extends CreateTruckerDto {
  @ApiProperty()
  @IsString()
  id: string;
}