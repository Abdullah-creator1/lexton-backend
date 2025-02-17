import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class QuotationService {
    constructor(private readonly db: DatabaseService) {}
  
    async create(createQuotationDto: CreateQuotationDto) {
      return this.db.query(
        'INSERT INTO rate_quotations (quotation_id, customer_id, term, validity, description, region, special_instruction, remarks, clauses, pickup_location, dropoff_location, carrier, equipment, weight, transit_time, cargo, user_id, is_deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, FALSE) RETURNING *',
        Object.values(createQuotationDto),
      );
    }
  
    async findAll() {
      return this.db.query('SELECT * FROM rate_quotations WHERE is_deleted = FALSE');
    }
  
    async findOne(id: string) {
      const result = await this.db.query('SELECT * FROM rate_quotations WHERE id = $1 AND is_deleted = FALSE', [id]);
      if (result.length === 0) {
        throw new NotFoundException('Quotation not found.');
      }
      return result[0];
    }
  
    async update(id: string, updateQuotationDto: UpdateQuotationDto) {
      return this.db.query(
        'UPDATE rate_quotations SET term = COALESCE($1, term), validity = COALESCE($2, validity), description = COALESCE($3, description), region = COALESCE($4, region), special_instruction = COALESCE($5, special_instruction), remarks = COALESCE($6, remarks), clauses = COALESCE($7, clauses), pickup_location = COALESCE($8, pickup_location), dropoff_location = COALESCE($9, dropoff_location), carrier = COALESCE($10, carrier), equipment = COALESCE($11, equipment), weight = COALESCE($12, weight), transit_time = COALESCE($13, transit_time), cargo = COALESCE($14, cargo) WHERE id = $15 RETURNING *',
        [...Object.values(updateQuotationDto), id],
      );
    }
  
    async remove(id: string) {
      await this.findOne(id);
      return this.db.query('UPDATE rate_quotations SET is_deleted = TRUE WHERE id = $1', [id]);
    }
  }