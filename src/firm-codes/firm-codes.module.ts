import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FirmcodesController } from './firm-codes.controller';
import { FirmcodesService } from './firm-codes.service';

@Module({
  imports:[DatabaseModule],
  controllers: [FirmcodesController],
  providers: [FirmcodesService],
})
export class FirmCodesModule {}
