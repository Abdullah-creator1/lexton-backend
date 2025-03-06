import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class StatesService {
  constructor(private readonly db: DatabaseService) {}

  async getStates() {
    const query = 'SELECT * FROM states ORDER BY state_name ASC;';
    const data = await this.db.query(query);
    return data.rows;
  }
}