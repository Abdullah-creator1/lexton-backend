import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum AssociatedEntityType {
  TRUCKER = 'trucker',
  CUSTOMER = 'customer',

}

export class CreateMediaDto {
  @ApiProperty({ enum: AssociatedEntityType })
  @IsEnum(AssociatedEntityType)
  associated_entity_type: AssociatedEntityType;
}