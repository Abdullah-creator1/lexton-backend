import { Module } from '@nestjs/common';
import { DistPortService } from './dist-port.service';
import { DistPortController } from './dist-port.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [DistPortController],
  providers: [DistPortService],
})
export class DistPortModule {}
