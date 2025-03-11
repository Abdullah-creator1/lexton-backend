import { Module } from '@nestjs/common';
import { CustomersmediaService } from './customersmedia.service';
import { CustomersmediaController } from './customersmedia.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [CustomersmediaController],
  providers: [CustomersmediaService],
})
export class CustomersmediaModule {}
