import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChargeType } from './dto/enum/charge-type.enum';

@ApiTags('charges')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('charges')
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new charge' })
  async create(@Body() createChargeDto: CreateChargeDto) {
    return this.chargesService.create(createChargeDto);
  }

  @Post('update')
  @ApiOperation({ summary: 'Update an existing charge' })
  async update(@Body() updateChargeDto: UpdateChargeDto) {
    return this.chargesService.update(updateChargeDto);
  }

  @Get('find-by-type')
  @ApiOperation({ summary: 'Find charges by charge type with pagination' })
  @ApiQuery({ name: 'chargeType', enum: ChargeType, required: true, description: 'Type of charge' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Number of records per page (default: 10)' })
  async findByChargeType(
      @Query('chargeType') chargeType: ChargeType,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10
  ) {
      return this.chargesService.findByChargeType(chargeType, page, limit);
  }

  @Get('delete')
  @ApiOperation({ summary: 'Soft delete a charge' })
  @ApiQuery({ name: 'id', required: true })
  async remove(@Query('id') id: string) {
    return this.chargesService.softDelete(id);
  }
}