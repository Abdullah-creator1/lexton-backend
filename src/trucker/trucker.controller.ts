import { Controller, Get, Post, Body, Query, UseGuards, Req, Param } from '@nestjs/common';
import { TruckerService } from './trucker.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateTruckerDto } from './dto/create-trucker.dto';
import { UpdateTruckerDto } from './dto/update-trucker.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@ApiTags('trucker')
@Controller('trucker')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TruckerController {
  constructor(private readonly truckerService: TruckerService) { }

  @Get('getAll')
    @ApiOperation({ summary: 'Get all truckers with pagination and search' })
    @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Number of records per page (default: 10)' })
    @ApiQuery({ name: 'search', required: false, example: 'John', description: 'Search by name, email, or phone' })
    async getAllTruckers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('search') search?: string
    ) {
        return await this.truckerService.getAll(page, search, limit);
    }

  @Post('create')
  @ApiOperation({ summary: 'Add a new trucker' })
  async createTrucker(@Body() createTruckerDto: CreateTruckerDto, @Req() req: any) {
    createTruckerDto['user_id'] = req.user?.userId;
    return this.truckerService.createTrucker(createTruckerDto);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update trucker details' })
  async updateTrucker(@Param('id') id: number, @Body() updateTruckerDto: UpdateTruckerDto) {
    return this.truckerService.updateTrucker(id , updateTruckerDto);
  }

  @Get('delete/:id')
  @ApiOperation({ summary: 'Soft delete a trucker' })
  async deleteTrucker(@Param('id') id: number) {
    return this.truckerService.deleteTrucker(id);
  }
}