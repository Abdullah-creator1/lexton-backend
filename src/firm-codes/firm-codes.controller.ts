import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FirmCodesService } from './firm-codes.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateFirmCodeDto } from './dto/create-firm-code.dto';
import { UpdateFirmCodeDto } from './dto/update-firm-code.dto';

@Controller('firm-codes')
@ApiTags('firm-codes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))

export class FirmCodesController {
  constructor(private readonly firmCodesService: FirmCodesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new firm code' })
  async create(@Body() createFirmCodeDto: CreateFirmCodeDto) {
    return this.firmCodesService.create(createFirmCodeDto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all firm codes' })
  async findAll() {
    return this.firmCodesService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get a firm code by ID' })
  async findOne(@Param('id') id: string) {
    return this.firmCodesService.findOne(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a firm code by ID' })
  async update(@Param('id') id: string, @Body() updateFirmCodeDto: UpdateFirmCodeDto) {
    return this.firmCodesService.update(id, updateFirmCodeDto);
  }

  @Get('delete/:id')
  @ApiOperation({ summary: 'Soft delete a firm code by ID' })
  async remove(@Param('id') id: string) {
    return this.firmCodesService.remove(id);
  }
}