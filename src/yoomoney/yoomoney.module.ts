import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { YoomoneyService } from './yoomoney.service';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [YoomoneyService],
  exports: [YoomoneyService],
})
export class YoomoneyModule {}
