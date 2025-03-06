import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ZipCodeService {
  constructor(private readonly db: DatabaseService) {}

  async getAll(page: number = 1, search?: string, limit: number = 10) {
    const offset = (page - 1) * limit;
    let query = `SELECT DISTINCT ON (zip) zip, city, state_id, state_name FROM zip_code`;
    let countQuery = `SELECT COUNT(DISTINCT zip) AS total FROM zip_code`;
    const params: any[] = [];

    if (search) {
      query += ` WHERE (zip ILIKE $1 OR city ILIKE $1 OR state_name ILIKE $1)`;
      countQuery += ` WHERE (zip ILIKE $1 OR city ILIKE $1 OR state_name ILIKE $1)`;
      params.push(`%${search}%`);
    }

    // Get the total count of unique zip codes
    const totalCountResult = await this.db.query(countQuery, params);
    const totalZipCodes = parseInt(totalCountResult.rows[0]?.total || "0", 10);

    query += ` ORDER BY zip, city LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const data = await this.db.query(query, params);

    return {
      page,
      totalZipCodes,
      totalPages: Math.ceil(totalZipCodes / limit),
      totalRecords: data.rows.length,
      records: data.rows,
    };
  }
}
