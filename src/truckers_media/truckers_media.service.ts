import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TruckersMediaService {
  constructor(private readonly db: DatabaseService) {}

  async getTruckerMedia(truckerId: number) {
    const query = `
      SELECT media_id, created_at 
      FROM lext_schema.truckers_media 
      WHERE trucker_id = $1
    `;
    
    const data = await this.db.query(query, [truckerId]);
    return data.rows;
  }
}