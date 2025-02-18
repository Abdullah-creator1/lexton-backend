import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { TruckerModule } from './trucker/trucker.module';
import { CustomerModule } from './customer/customer.module';
import { ChargesModule } from './charges/charges.module';
import { FirmCodesModule } from './firm-codes/firm-codes.module';
import { QuotationModule } from './quotation/quotation.module';
import { LocationsModule } from './locations/locations.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    MediaModule,
    TruckerModule,
    CustomerModule,
    ChargesModule,
    FirmCodesModule,
    QuotationModule,
    LocationsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
