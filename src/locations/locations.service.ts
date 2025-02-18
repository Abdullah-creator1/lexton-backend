import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LocationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getLocationById(id: number): Promise<{ id: number; stateName: string }> {
    const query = 'SELECT id, state_name FROM locations WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    if (result.rowCount === 0) {
      throw new Error('Location not found');
    }
    return { id: result.rows[0].id, stateName: result.rows[0].state_name };
  }
}