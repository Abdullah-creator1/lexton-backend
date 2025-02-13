import { Module } from '@nestjs/common';
import { TruckerService } from './trucker.service';
import { TruckerController } from './trucker.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TruckerController],
  providers: [TruckerService],
})
export class TruckerModule { }
