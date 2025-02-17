import { IsString, IsNumber, IsBoolean, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChargeType } from './enum/charge-type.enum';

export class UpdateChargeDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  chargeCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  chargeName?: string;

  @ApiProperty({ enum: ChargeType })
  @IsOptional()
  @IsEnum(ChargeType)
  chargeType?: ChargeType;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  chargeValue?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}