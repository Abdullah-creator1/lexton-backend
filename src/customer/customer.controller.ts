import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('get')
  @ApiOperation({ summary: 'Get a list of customers with pagination and search' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Number of records per page (default: 10)' })
  @ApiQuery({ name: 'search', required: false, example: 'John', description: 'Search by name, email, or phone' })
  async getCustomers(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('search') search?: string
  ) {
      return await this.customerService.getCustomers(page, search, limit);
  }
  
  @Post('create')
  @ApiOperation({ summary: 'Create a new customer' })
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Post('update')
  @ApiOperation({ summary: 'Update an existing customer' })
  updateCustomer(@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.updateCustomer(updateCustomerDto);
  }

  @Get('delete')
  @ApiOperation({ summary: 'Soft delete a customer' })
  @ApiQuery({ name: 'name', required: true })
  deleteCustomer(@Query('name') name: string) {
    return this.customerService.deleteCustomer(name);
  }
}