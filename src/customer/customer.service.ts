import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly db: DatabaseService) {}

  async getCustomers() {
    return this.db.query('SELECT * FROM customers WHERE is_deleted = FALSE');
  }

  async createCustomer(dto: CreateCustomerDto) {

    await this.db.query(
      'INSERT INTO customers (name, address, country, state, city, zip, documentation, contact_person, phone, email, email_2, cell, terms_net_days, penalty_percent, notes, is_deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, FALSE)',
      [dto.name, dto.address, dto.country, dto.state, dto.city, dto.zip, dto.documentation, dto.contact_person, dto.phone, dto.email, dto.email_2, dto.cell, dto.terms, dto.penalty, dto.notes]
    );
    return { message: 'Customer created successfully.' };
  }

  async updateCustomer(dto: UpdateCustomerDto) {
    const fields = Object.keys(dto).filter(key => key !== 'name' && dto[key] !== undefined);
    if (fields.length === 0) return 'No fields to update.';

    const setClause = fields.map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = fields.map(key => dto[key]);
    values.unshift(dto.name);

    await this.db.query(`UPDATE customers SET ${setClause} WHERE name = $1 AND is_deleted = FALSE`, values);
    return { message: 'Customer updated successfully.' };
  }

  async deleteCustomer(name: string) {
    const result = await this.db.query('UPDATE customers SET is_deleted = TRUE WHERE name = $1 AND is_deleted = FALSE', [name]);
    if (result.rowCount === 0) return 'Customer not found.';
    return { message: 'Customer deleted successfully.' };
  }
}
