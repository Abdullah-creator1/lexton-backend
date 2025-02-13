import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum AssociatedEntityType {
  STORE = 'store',
  PRODUCT = 'product',
  CATEGORY = 'category',
}

export class CreateMediaDto {
  @ApiProperty({ enum: AssociatedEntityType })
  @IsEnum(AssociatedEntityType)
  associated_entity_type: AssociatedEntityType;
}