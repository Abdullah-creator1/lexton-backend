import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { ChargeType } from './dto/enum/charge-type.enum';

@Injectable()
export class ChargesService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateChargeDto) {
    const query = `INSERT INTO charges ( charge_name, charge_type, charge_value, active) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const values = [ dto.chargeName, dto.chargeType, dto.chargeValue, dto.active];
    const data = await this.db.query(query, values);
    return { message: 'Charge created successfully.', data: data.rows[0] };
  }

  async update(dto: UpdateChargeDto) {
    let query = 'UPDATE charges SET ';
    const updates: string[] = [];
    const values: any[] = [];  // Explicitly define the array type

   
    if (dto.chargeName) updates.push(`charge_name = $${values.push(dto.chargeName)}`);
    if (dto.chargeType) updates.push(`charge_type = $${values.push(dto.chargeType)}`);
    if (dto.chargeValue) updates.push(`charge_value = $${values.push(dto.chargeValue)}`);
    if (dto.active !== undefined) updates.push(`active = $${values.push(dto.active)}`);

    if (updates.length === 0) return 'No fields to update.';

    query += updates.join(', ') + ` WHERE id = $${values.push(dto.id)} RETURNING *`;
    const data = await this.db.query(query, values);

    return { message: 'Charge updated successfully.', data: data.rows[0] };
}

async findByChargeType(chargeType: ChargeType, page: number = 1, limit: number = 10) {

  const offset = (page - 1) * limit;

  const totalCountQuery = `SELECT COUNT(id) AS total FROM charges WHERE charge_type = $1 and is_deleted = FALSE`;
  const totalCountResult = await this.db.query(totalCountQuery, [chargeType]);
  const totalCharges = parseInt(totalCountResult.rows[0]?.total || "0", 10);

  const query = `SELECT * FROM charges WHERE charge_type = $1 and is_deleted = FALSE
                 LIMIT $2 OFFSET $3`;
  const values = [chargeType, limit, offset];

  const data = await this.db.query(query, values);

  return {
      page,
      totalCharges,
      totalPages: Math.ceil(totalCharges / limit),
      totalRecords: data.rows.length,
      records: data.rows,
  };
}

  async deletecustomer(id: number) {
    
    const result = await this.db.query('UPDATE charges SET is_deleted = TRUE WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) return 'charges not found.';
    return { message: 'Charge removed successfully.' };
  }
}