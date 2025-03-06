import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FirmcodesService {
  constructor(private readonly db: DatabaseService) {}

  async getAll(page: number = 1, search?: string,limit:number=10) {
    const offset = (page - 1) * limit;
    let query = `SELECT * FROM firmcodes `;
    const params: any[] = [];

  

    if (search) {
      query += ` where (FIRM ILIKE $1 OR NAME ILIKE $1 OR CITY ILIKE $1)`;
      params.push(`%${search}%`);
    }
   
    const totalCountQuery = `SELECT COUNT(id) AS total FROM firmcodes `;
    const totalCountResult = await this.db.query(totalCountQuery);
    const totalFirmcodes = parseInt(totalCountResult.rows[0]?.total || "0", 10);

    query += ` ORDER BY Id LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const data = await this.db.query(query, params);
    return {
      page,
      totalFirmcodes,
      totalPages: Math.ceil(totalFirmcodes / limit),
      totalRecords: data.rows.length,
      records: data.rows,
    };
  }
}
