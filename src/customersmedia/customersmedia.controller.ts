import { BadRequestException, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomersmediaService } from './customersmedia.service';

@ApiTags('customers-media')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('customers-media')
export class CustomersmediaController {
  constructor(private readonly customersMediaService: CustomersmediaService) {}

  @Get('get')
  @ApiOperation({ summary: 'Fetch media for a customer' })
  @ApiQuery({ name: 'customerId', required: true, type: Number })
  async getCustomerMedia(@Query('customerId') customerId: string) {
    const parsedCustomerId = parseInt(customerId, 10);
    if (isNaN(parsedCustomerId)) {
      throw new BadRequestException('Invalid customerId. It must be a valid number.');
    }
    return await this.customersMediaService.getCustomerMedia(parsedCustomerId);
  }
}