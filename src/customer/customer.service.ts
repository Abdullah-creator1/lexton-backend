import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly db: DatabaseService) {}

  async getCustomers(page: number = 1, search?: string, limit: number = 10) {
    const offset = (page - 1) * limit;
    let query = `SELECT * FROM customers WHERE is_deleted = FALSE`;
    let totalCountQuery = `SELECT COUNT(id) AS total FROM customers WHERE is_deleted = FALSE`;
    const params: any[] = [];

    if (search) {
        query += ` AND (name ILIKE $1 OR email ILIKE $1)`;
        totalCountQuery += ` AND (name ILIKE $1 OR email ILIKE $1)`;
        params.push(`%${search}%`);
    }


    const totalCountResult = await this.db.query(totalCountQuery, params.length > 0 ? params : []);
    const totalCustomers = parseInt(totalCountResult.rows[0]?.total || "0", 10);

    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const data = await this.db.query(query, params.length > 0 ? params : []);
    return {
        page,
        totalCustomers,
        totalPages: Math.ceil(totalCustomers / limit),
        totalRecords: data.rows.length,
        records: data.rows,
    };
}

  async createCustomer(dto: CreateCustomerDto) {

   const result = await this.db.query(
      'INSERT INTO customers (name, address, country, state, city, zip, documentation, contact_person, phone, email, email_2, cell, term_net_day, penalty_percent, notes, is_deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, FALSE) returning *',
      [dto.name, dto.address, dto.country, dto.state, dto.city, dto.zip, dto.documentation, dto.contact_person, dto.phone, dto.email, dto.email_2, dto.cell, dto.term_net_day, dto.penalty, dto.notes]
    );
    let customerdata = result.rows[0];
    if (!dto.browse) {
        return result.rows[0];
    }
    customerdata['media'] = [];

    if (!dto.browse || dto.browse.length === 0) {
        return customerdata;
    }
    debugger;
    const insertPromises = dto.browse.map(async (element) => {
        let query = `INSERT INTO customers_media (customer_id, media_id) VALUES ($1, $2) RETURNING *`;
        let params = [customerdata.id, element];
        const mediaData = await this.db.query(query, params);
        return mediaData.rows[0];
    });        
    customerdata.media = await Promise.all(insertPromises);
    return customerdata;
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
