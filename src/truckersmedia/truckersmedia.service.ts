import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TruckersmediaService {
  constructor(private readonly db: DatabaseService) {}

  async getTruckerMedia(trucker_id: number) {
    const query = `
      SELECT tm.*, m.*
      FROM lext_schema.truckers_media tm
      JOIN lext_schema.media m ON tm.media_id = m.id
      WHERE tm.trucker_id = $1
    `;
   
    const data = await this.db.query(query, [trucker_id]);
    return data.rows;
  }
}