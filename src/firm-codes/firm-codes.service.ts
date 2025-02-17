import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateFirmCodeDto } from './dto/create-firm-code.dto';
import { UpdateFirmCodeDto } from './dto/update-firm-code.dto';

@Injectable()
export class FirmCodesService {
  constructor(private readonly db: DatabaseService) {}

  async create(createFirmCodeDto: CreateFirmCodeDto) {
    return this.db.query(
      'INSERT INTO firm_codes (name, address, state, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        createFirmCodeDto.name,
        createFirmCodeDto.address,
        createFirmCodeDto.city_state,
        createFirmCodeDto.phone_no,
      ],
    );
  }

  async findAll() {
    return this.db.query('SELECT * FROM firm_codes WHERE is_deleted = FALSE');
  }

  async findOne(id: string) {
    const result = await this.db.query('SELECT * FROM firm_codes WHERE id = $1 AND is_deleted = FALSE', [id]);
    if (result.length === 0) {
      throw new NotFoundException('Firm code not found.');
    }
    return result[0];
  }

  async update(id: string, updateFirmCodeDto: UpdateFirmCodeDto) {
    const existing = await this.findOne(id);
    return this.db.query(
      'UPDATE firm_codes SET name = $1, address = $2, city_state = $3, phone_no = $4 WHERE id = $5 RETURNING *',
      [
        updateFirmCodeDto.name || existing.name,
        updateFirmCodeDto.address || existing.address,
        updateFirmCodeDto.city_state || existing.city_state,
        updateFirmCodeDto.phone_no || existing.phone_no,
        id,
      ],
    );
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.query('UPDATE firm_codes SET is_deleted = TRUE WHERE id = $1', [id]);
  }
}