import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class DistPortService {
  constructor(private readonly db: DatabaseService) { }

  async getAllDistPorts() {
    const data = await this.db.query(
      'SELECT id, "dist_port" FROM dist_port'
    );
    return data;
  }
}