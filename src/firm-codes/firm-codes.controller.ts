import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FirmcodesService } from './firm-codes.service';

@ApiTags('Firmcodes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('firmcodes')
export class FirmcodesController {
  constructor(private readonly firmcodesService: FirmcodesService) {}

  @Get('get-all')
  @ApiOperation({ summary: 'Fetch paginated firmcodes with optional search' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'limit number (default: 10)' })
  @ApiQuery({ name: 'search', required: false, description: 'Search term for FIRM, NAME, or CITY' })
  async getAll(@Query('page') page?: number,@Query('limit') limit?: number, @Query('search') search?: string) {
    return this.firmcodesService.getAll(page, search,limit);
  }

   @Get('delete/:id')
    @ApiOperation({ summary: 'Soft delete a charge' })
    deletefirmcode(@Param('id') id: number) {
      return this.firmcodesService.deletefirmcode(id);
    }

}
