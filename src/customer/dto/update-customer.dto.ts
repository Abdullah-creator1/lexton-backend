import { IsString, IsOptional, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsString()
  country?: string;

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
  @IsString()
  cell?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  terms?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  penalty?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;
}
