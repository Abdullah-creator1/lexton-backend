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
import { DistPortModule } from './dist-port/dist-port.module';
import { ZipCodeModule } from './zip-code/zip-code.module';
import { StatesModule } from './states/states.module';
import { TruckersMediaModule } from './truckers_media/truckers_media.module';
import { CountriesModule } from './countries/countries.module';



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
    DistPortModule,
    ZipCodeModule,
    StatesModule,
    TruckersMediaModule,
    CountriesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
