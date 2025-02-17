import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFirmCodeDto {
    @ApiProperty({ description: 'Name of the firm', required: false })
    @IsString()
    @IsOptional()
    name?: string;
  
    @ApiProperty({ description: 'Address of the firm', required: false })
    @IsString()
    @IsOptional()
    address?: string;
  
    @ApiProperty({ description: 'City and state of the firm', required: false })
    @IsString()
    @IsOptional()
    city_state?: string;
  
    @ApiProperty({ description: 'Phone number of the firm', required: false })
    @IsNumber()
    @IsOptional()
    phone_no?: number;
  }
  