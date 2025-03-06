import { Controller, Get, UseGuards } from '@nestjs/common';
import { DistPortService } from './dist-port.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Dist Port')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('dist-port')
export class DistPortController {
  constructor(private readonly distPortService: DistPortService) {}

  @Get('get')
  @ApiOperation({ summary: 'Get all dist/ports' })
  async getAll() {
    return this.distPortService.getAllDistPorts();
  }
}