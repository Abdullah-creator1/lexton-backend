import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class UpdateQuotationDto {
    @ApiProperty({ description: 'Term', required: false })
    @IsString()
    @IsOptional()
    term?: string;
  
    @ApiProperty({ description: 'Validity', required: false })
    @IsDateString()
    @IsOptional()
    validity?: string;
  
    @ApiProperty({ description: 'Description', required: false })
    @IsString()
    @IsOptional()
    description?: string;
  
    @ApiProperty({ description: 'Region', required: false })
    @IsString()
    @IsOptional()
    region?: string;
  
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
  
    @ApiProperty({ description: 'Pickup Location', required: false })
    @IsString()
    @IsOptional()
    pickup_location?: string;
  
    @ApiProperty({ description: 'Dropoff Location', required: false })
    @IsString()
    @IsOptional()
    dropoff_location?: string;
  
    @ApiProperty({ description: 'Carrier', required: false })
    @IsString()
    @IsOptional()
    carrier?: string;
  
    @ApiProperty({ description: 'Equipment', required: false })
    @IsString()
    @IsOptional()
    equipment?: string;
  
    @ApiProperty({ description: 'Weight', required: false })
    @IsString()
    @IsOptional()
    weight?: string;
  
    @ApiProperty({ description: 'Transit Time', required: false })
    @IsString()
    @IsOptional()
    transit_time?: string;
  
    @ApiProperty({ description: 'Cargo', required: false })
    @IsString()
    @IsOptional()
    cargo?: string;
  }