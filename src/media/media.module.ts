import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseService } from '../database/database.service';
import { MediaService } from './media.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Directory where files will be stored
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService, DatabaseService],
  exports: [MediaService], // Allow StoreModule to use MediaService
})
export class MediaModule {}
