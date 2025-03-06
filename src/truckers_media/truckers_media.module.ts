import { Module } from '@nestjs/common';
import { TruckersMediaService } from './truckers_media.service';
import { TruckersMediaController } from './truckers_media.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [TruckersMediaController],
  providers: [TruckersMediaService],
})
export class TruckersMediaModule {}
