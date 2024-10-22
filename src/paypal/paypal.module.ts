import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [PaypalService],
  exports: [PaypalService],
})
export class PaypalModule {}
