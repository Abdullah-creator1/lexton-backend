import { Module } from '@nestjs/common';
import { TruckersmediaService } from './truckersmedia.service';
import { TruckersmediaController } from './truckersmedia.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [TruckersmediaController],
  providers: [TruckersmediaService],
})
export class TruckersmediaModule {}
