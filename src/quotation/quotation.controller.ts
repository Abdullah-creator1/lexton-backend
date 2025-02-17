import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { QuotationService } from './quotation.service';

@ApiTags('quotations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('quotations')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new quotation' })
  async create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.create(createQuotationDto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all quotations' })
  async findAll() {
    return this.quotationService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get a quotation by ID' })
  async findOne(@Param('id') id: string) {
    return this.quotationService.findOne(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a quotation by ID' })
  async update(@Param('id') id: string, @Body() updateQuotationDto: UpdateQuotationDto) {
    return this.quotationService.update(id, updateQuotationDto);
  }

  @Get('delete/:id')
  @ApiOperation({ summary: 'Soft delete a quotation by ID' })
  async remove(@Param('id') id: string) {
    return this.quotationService.remove(id);
  }
}
