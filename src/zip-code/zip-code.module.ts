import { Module } from '@nestjs/common';
import { ZipCodeService } from './zip-code.service';
import { ZipCodeController } from './zip-code.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [ZipCodeController],
  providers: [ZipCodeService],
})
export class ZipCodeModule {}
