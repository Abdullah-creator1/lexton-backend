import { Module } from '@nestjs/common';
import { FirmCodesService } from './firm-codes.service';
import { FirmCodesController } from './firm-codes.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [FirmCodesController],
  providers: [FirmCodesService],
})
export class FirmCodesModule {}
