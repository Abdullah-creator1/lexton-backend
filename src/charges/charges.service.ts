import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';

@Injectable()
export class ChargesService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateChargeDto) {
    const query = `INSERT INTO charges (charge_code, charge_name, charge_type, charge_value, active) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const values = [dto.chargeCode, dto.chargeName, dto.chargeType, dto.chargeValue, dto.active];
    const data = await this.db.query(query, values);
    return { message: 'Charge created successfully.', data: data.rows[0] };
  }

  async update(dto: UpdateChargeDto) {
    let query = 'UPDATE charges SET ';
    const updates: string[] = [];
    const values: any[] = [];  // Explicitly define the array type

    if (dto.chargeCode) updates.push(`charge_code = $${values.push(dto.chargeCode)}`);
    if (dto.chargeName) updates.push(`charge_name = $${values.push(dto.chargeName)}`);
    if (dto.chargeType) updates.push(`charge_type = $${values.push(dto.chargeType)}`);
    if (dto.chargeValue) updates.push(`charge_value = $${values.push(dto.chargeValue)}`);
    if (dto.active !== undefined) updates.push(`active = $${values.push(dto.active)}`);

    if (updates.length === 0) return 'No fields to update.';

    query += updates.join(', ') + ` WHERE id = $${values.push(dto.id)} RETURNING *`;
    const data = await this.db.query(query, values);

    return { message: 'Charge updated successfully.', data: data.rows[0] };
}

  async findAll() {
    const query = 'SELECT * FROM charges WHERE active = TRUE';
    const data = await this.db.query(query);
    return data.rows;
  }

  async softDelete(id: string) {
    const query = 'UPDATE charges SET active = FALSE WHERE id = $1 RETURNING *';
    const data = await this.db.query(query, [id]);
    return { message: 'Charge deactivated successfully.', data: data.rows[0] };
  }
}