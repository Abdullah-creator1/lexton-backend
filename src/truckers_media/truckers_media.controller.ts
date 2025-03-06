import { TruckersMediaService } from './truckers_media.service';
import {  Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags ,ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@ApiTags('Truckers Media')
@Controller('truckers-media')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()

export class TruckersMediaController {
  constructor(private readonly truckersMediaService: TruckersMediaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':truckerId')
  @ApiOperation({ summary: 'Get media for a trucker' })
  async getTruckerMedia(@Param('truckerId') truckerId: number) {
    return this.truckersMediaService.getTruckerMedia(truckerId);
  }
}