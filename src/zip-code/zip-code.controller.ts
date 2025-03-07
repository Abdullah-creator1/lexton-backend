import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ZipCodeService } from './zip-code.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Zip Codes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('zip-code')
export class ZipCodeController {
  constructor(private readonly zipCodeService: ZipCodeService) {}

  @Get('get')
  @ApiOperation({ summary: 'Fetch zip codes with pagination and search' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ) {
    return this.zipCodeService.getAll(page, search, limit);
  }

   @Get('delete/:id')
      @ApiOperation({ summary: 'Soft delete a zip code' })
      deletezipcode(@Param('id') id: number) {
        return this.zipCodeService.deletezipcode(id);
      }

}
