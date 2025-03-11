import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CustomersmediaService {
  constructor(private readonly db: DatabaseService) {}

  async getCustomerMedia(customerId: number) {
    const query = `
      SELECT cm.* , m.*
      FROM lext_schema.customers_media cm
      JOIN lext_schema.media m ON cm.media_id = m.id
      WHERE cm.customer_id = $1
    `;
    const data = await this.db.query(query, [customerId]);
    return data.rows;
  }
}