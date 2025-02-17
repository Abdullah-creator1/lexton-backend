import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service'; 
import { QuotationController } from './quotation.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
