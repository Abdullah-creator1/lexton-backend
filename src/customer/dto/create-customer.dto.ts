import { IsString, IsOptional, IsNumber, IsEmail, IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TermNetDaysEnum } from './enum/customer.enum';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNumber()
  country: number;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  zip: string;

  @ApiProperty()
  @IsString()
  documentation: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)  // Ensure at least one media file if provided
  @IsNumber({}, { each: true }) // Each value in the array must be a number (media ID)
  browse: number[]=[];

  @ApiProperty()
  @IsString()
  contact_person: string;

  @ApiProperty()
  @IsNumber()
  phone: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email_2?: string;

  @ApiProperty()
  @IsNumber()
  cell: number;

  @ApiProperty({ description: 'Payment terms for the customer',enum: TermNetDaysEnum})
  @IsEnum(TermNetDaysEnum, { message: 'term_net_day must be a valid ENUM value' })
  term_net_day: TermNetDaysEnum;

  @ApiProperty()
  @IsNumber()
  penalty: number;

  @ApiProperty()
  @IsString()
  notes: string;
}