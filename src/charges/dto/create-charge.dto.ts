import { IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChargeType } from './enum/charge-type.enum';

export class CreateChargeDto {
  @ApiProperty()
  @IsString()
  chargeCode: string;

  @ApiProperty()
  @IsString()
  chargeName: string;

  @ApiProperty({ enum: ChargeType })
  @IsEnum(ChargeType)
  chargeType: ChargeType;

  @ApiProperty()
  @IsNumber()
  chargeValue: number;

  @ApiProperty()
  @IsBoolean()
  active: boolean;
}