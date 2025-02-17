import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateQuotationDto {
    @ApiProperty({ description: 'Quotation ID' })
    @IsString()
    @IsNotEmpty()
    quotation_id: string;
  
    @ApiProperty({ description: 'Customer ID' })
    @IsNumber()
    @IsNotEmpty()
    customer_id: number;
  
    @ApiProperty({ description: 'Term' })
    @IsString()
    @IsNotEmpty()
    term: string;
  
    @ApiProperty({ description: 'Validity' })
    @IsDateString()
    @IsNotEmpty()
    validity: string;
  
    @ApiProperty({ description: 'Description' })
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @ApiProperty({ description: 'Region' })
    @IsString()
    @IsNotEmpty()
    region: string;
  
    @ApiProperty({ description: 'Special Instructions', required: false })
    @IsString()
    @IsOptional()
    special_instruction?: string;
  
    @ApiProperty({ description: 'Remarks', required: false })
    @IsString()
    @IsOptional()
    remarks?: string;
  
    @ApiProperty({ description: 'Clauses', required: false })
    @IsString()
    @IsOptional()
    clauses?: string;
  
    @ApiProperty({ description: 'Pickup Location' })
    @IsString()
    @IsNotEmpty()
    pickup_location: string;
  
    @ApiProperty({ description: 'Dropoff Location' })
    @IsString()
    @IsNotEmpty()
    dropoff_location: string;
  
    @ApiProperty({ description: 'Carrier' })
    @IsString()
    @IsNotEmpty()
    carrier: string;
  
    @ApiProperty({ description: 'Equipment' })
    @IsString()
    @IsNotEmpty()
    equipment: string;
  
    @ApiProperty({ description: 'Weight' })
    @IsString()
    @IsNotEmpty()
    weight: string;
  
    @ApiProperty({ description: 'Transit Time' })
    @IsString()
    @IsNotEmpty()
    transit_time: string;
  
    @ApiProperty({ description: 'Cargo' })
    @IsString()
    @IsNotEmpty()
    cargo: string;
  
    @ApiProperty({ description: 'User ID' })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
  }