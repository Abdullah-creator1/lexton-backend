import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFirmCodeDto {
    @ApiProperty({ description: 'Name of the firm' })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ description: 'Address of the firm' })
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @ApiProperty({ description: 'City and state of the firm' })
    @IsString()
    @IsNotEmpty()
    city_state: string;
  
    @ApiProperty({ description: 'Phone number of the firm'})
    @IsNumber()
    @IsNotEmpty()
    phone_no: number;
}