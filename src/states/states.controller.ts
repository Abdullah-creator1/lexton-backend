import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatesService } from './states.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('States')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get('get')
  @ApiOperation({ summary: 'Get all states' })
  async getStates() {
    return await this.statesService.getStates();
  }
}