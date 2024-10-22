import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PaypalModule } from './paypal/paypal.module';
import { StripeModule } from './stripe/stripe.module';
import { YoomoneyService } from './yoomoney/yoomoney.service';
import { YoomoneyModule } from './yoomoney/yoomoney.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { PaypalService } from './paypal/paypal.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://aset:aset@payment.iiyx0.mongodb.net/Payment?retryWrites=true&w=majority&appName=Payment',
    ),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    PaypalModule,
    StripeModule,
    YoomoneyModule,
  ],
  controllers: [AppController],
  providers: [AppService, YoomoneyService, PaypalService],
})
export class AppModule {}
