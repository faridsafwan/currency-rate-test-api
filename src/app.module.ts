import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './modules/currency/currency.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/currency-test'),
    CurrencyModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
