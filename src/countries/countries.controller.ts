import { Controller, Get, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@ApiTags('Countries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}
  
  @Get('get')
  @ApiOperation({ summary: 'Get all countries' })
  async getCountries() {
      return this.countriesService.getCountries();
  }
}
