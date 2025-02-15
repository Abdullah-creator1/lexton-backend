import { IsString, IsOptional, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  country: string;

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
  @IsString()
  cell: string;

  @ApiProperty()
  @IsNumber()
  terms: number;

  @ApiProperty()
  @IsNumber()
  penalty: number;

  @ApiProperty()
  @IsString()
  notes: string;
}