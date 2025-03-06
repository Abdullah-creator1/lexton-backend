import { IsString, IsOptional, IsNumber, IsEmail, IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TermNetDaysEnum } from './enum/customer.enum';

export class UpdateCustomerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  country?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  zip?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  documentation?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)  // Ensure at least one media file if provided
  @IsNumber({}, { each: true }) // Each value in the array must be a number (media ID)
  browse?: number[]=[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  contact_person?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  phone?: number;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  email_2?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cell?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TermNetDaysEnum, { message: 'term_net_day must be a valid ENUM value' })
  term_net_day: TermNetDaysEnum;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  penalty?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;
}
