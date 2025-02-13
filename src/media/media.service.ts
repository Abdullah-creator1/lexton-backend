import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MediaService {
  constructor(private readonly db: DatabaseService) { }

  async saveMedia(file: Express.Multer.File, entityType: string, userId: string) {
    const result = await this.db.query(
      `INSERT INTO media (file_name, file_path, file_type, associated_entity_type, userId)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [file.filename, file.path, file.mimetype, entityType, userId]
    );

    const media = result.rows[0];
    return media;
  }
}
