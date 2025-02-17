import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

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

  @Get('get')
  @ApiOperation({ summary: 'Get all active charges' })
  async findAll() {
    return this.chargesService.findAll();
  }

  @Get('delete')
  @ApiOperation({ summary: 'Soft delete a charge' })
  @ApiQuery({ name: 'id', required: true })
  async remove(@Query('id') id: string) {
    return this.chargesService.softDelete(id);
  }
}