import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { TruckerService } from './trucker.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTruckerDto } from './dto/create-trucker.dto';
import { UpdateTruckerDto } from './dto/update-trucker.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@ApiTags('trucker')
@Controller('trucker')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TruckerController {
  constructor(private readonly truckerService: TruckerService) { }

  @Get('get')
  @ApiOperation({ summary: 'Retrieve all truckers' })
  async getAllTruckers() {
    return this.truckerService.getAllTruckers();
  }

  @Post('create')
  @ApiOperation({ summary: 'Add a new trucker' })
  async createTrucker(@Body() createTruckerDto: CreateTruckerDto) {
    return this.truckerService.createTrucker(createTruckerDto);
  }

  @Post('update')
  @ApiOperation({ summary: 'Update trucker details' })
  async updateTrucker(@Body() updateTruckerDto: UpdateTruckerDto) {
    return this.truckerService.updateTrucker(updateTruckerDto);
  }

  @Get('delete')
  @ApiOperation({ summary: 'Soft delete a trucker' })
  async deleteTrucker(@Query('id') id: string) {
    return this.truckerService.deleteTrucker(id);
  }
}