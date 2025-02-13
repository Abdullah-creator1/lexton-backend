import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsBoolean, IsEmail, IsNumber } from 'class-validator';

export class CreateTruckerDto {
  @ApiProperty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsString()
  company_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  company_legal_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  company_other_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  rating?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cell?: string;

  @ApiProperty()
  @IsEmail()
  email_1: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email_2?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  accounting_email_3?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  accounting_email_4?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  zip_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  group_department_port_terminal?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address_1?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address_2?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  dot_number?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mc_number?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tariff_number?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  scac_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  account?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  hazardous?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  reefer?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  customs_bonded?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  over_weight?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  full_truckload?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  less_than_truckload?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  container_drayage?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  out_of_gauge?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  iso_tanks?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  trans_loading?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  flatbed?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  open_tops?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  residential?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  heavy_haul?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  conestoga?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  triaxles?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  warehouse?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  storage?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  long_haul?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  documentation?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;
}