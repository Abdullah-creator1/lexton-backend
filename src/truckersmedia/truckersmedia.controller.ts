import { BadRequestException, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TruckersmediaService } from './truckersmedia.service';

@ApiTags('truckers-media')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('truckers-media')
export class TruckersmediaController {
  constructor(private readonly truckersMediaService: TruckersmediaService) {}

  @Get('get/:trucker_id')
  @ApiOperation({ summary: 'Fetch media for a trucker' })
  getTruckerMedia(@Param('trucker_id') trucker_id: string) {
    const parsedTruckerId = parseInt(trucker_id, 10);
    if (isNaN(parsedTruckerId)) {
      throw new BadRequestException('Invalid trucker_id. It must be a number.');
    }
    return this.truckersMediaService.getTruckerMedia(parsedTruckerId);
  }
}
